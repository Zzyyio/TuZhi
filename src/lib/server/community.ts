import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { SEEDS } from "./community-seeds";
import { blockedReason } from "./moderation";

export type PostRow = {
  id: number;
  user_id: string;
  title: string;
  body: string;
  crop: string | null;
  region: string | null;
  problem_type: string | null;
  created_at: string;
  display_name: string;
  answer_count: number;
};

export type AnswerRow = {
  id: number;
  user_id: string;
  body: string;
  display_name: string;
  created_at: string;
};

async function ensureProfile(sql: Awaited<ReturnType<typeof getSql>>, userId: string, name?: string) {
  await sql`
    insert into profiles (user_id, display_name)
    values (${userId}, ${name || "农户"})
    on conflict (user_id) do nothing
  `;
}

async function ensureSeed(sql: Awaited<ReturnType<typeof getSql>>) {
  try {
    await sql`
      insert into profiles (user_id, display_name)
      values ('li-zeyu', '李泽宇 Li Zeyu')
      on conflict (user_id) do update set display_name = '李泽宇 Li Zeyu'
    `;
    for (const s of SEEDS) {
      await sql`
        insert into posts (user_id, display_name, title, body, problem_type, crop, region, created_at)
        select 'system-seed', ${s.farmer}, ${s.title}, ${s.body}, ${s.problem}, ${s.crop}, ${s.region}, ${s.at}::timestamptz
        where not exists (select 1 from posts where title = ${s.title})
      `;
      await sql`
        update posts
        set display_name = ${s.farmer},
            body = ${s.body},
            problem_type = ${s.problem},
            crop = ${s.crop},
            region = ${s.region},
            created_at = ${s.at}::timestamptz
        where title = ${s.title} and user_id = 'system-seed'
      `;
      await sql`
        insert into answers (post_id, user_id, display_name, body, created_at)
        select p.id, 'li-zeyu', '李泽宇 Li Zeyu', ${s.answer}, ${s.answerAt}::timestamptz
        from posts p
        where p.title = ${s.title}
          and not exists (select 1 from answers a where a.post_id = p.id and a.user_id = 'li-zeyu')
      `;
    }
  } catch {
    /* seed is best-effort */
  }
}

function numId(raw: unknown): number {
  const n = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export const listPosts = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const problem =
      input && typeof input === "object" && "problem" in input && typeof (input as { problem?: unknown }).problem === "string"
        ? (input as { problem: string }).problem.trim()
        : "";
    return { problem: problem || undefined };
  })
  .handler(async ({ data }): Promise<PostRow[]> => {
    const sql = await getSql();
    await ensureSeed(sql);
    const problem = data.problem ?? null;
    const rows = await sql<PostRow>`
      select p.id, p.user_id, p.title, p.body, p.crop, p.region, p.problem_type,
             p.created_at::text as created_at,
             coalesce(nullif(p.display_name, ''), pr.display_name, '农户') as display_name,
             (select count(*)::int from answers a where a.post_id = p.id) as answer_count
      from posts p
      left join profiles pr on pr.user_id = p.user_id
      where (${problem}::text is null or p.problem_type = ${problem})
      order by p.created_at desc
      limit 50
    `;
    return rows.map((r) => ({ ...r, id: numId(r.id) }));
  });

export const getPost = createServerFn({ method: "POST" })
  .validator((input: { id: number | string }) => ({ id: numId(input.id) }))
  .handler(async ({ data }) => {
    if (!data.id) return { post: null as PostRow | null, answers: [] as AnswerRow[] };
    const sql = await getSql();
    await ensureSeed(sql);
    const posts = await sql<PostRow>`
      select p.id, p.user_id, p.title, p.body, p.crop, p.region, p.problem_type,
             p.created_at::text as created_at,
             coalesce(nullif(p.display_name, ''), pr.display_name, '农户') as display_name,
             (select count(*)::int from answers a where a.post_id = p.id) as answer_count
      from posts p
      left join profiles pr on pr.user_id = p.user_id
      where p.id = ${data.id}
    `;
    const answers = await sql<AnswerRow>`
      select a.id, a.user_id, a.body,
             coalesce(nullif(a.display_name, ''), pr.display_name, '农户') as display_name,
             a.created_at::text as created_at
      from answers a
      left join profiles pr on pr.user_id = a.user_id
      where a.post_id = ${data.id}
      order by a.created_at asc
    `;
    const post = posts[0] ? { ...posts[0], id: numId(posts[0].id) } : null;
    return { post, answers: answers.map((a) => ({ ...a, id: numId(a.id) })) };
  });

export const createPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title: string; body: string; crop?: string; region?: string; problem?: string }) => input)
  .handler(async ({ data, context }) => {
    const title = data.title.trim();
    const body = data.body.trim();
    if (title.length < 4 || body.length < 8) return { ok: false as const, error: "short" };
    const blocked = blockedReason(title + body);
    if (blocked) return { ok: false as const, error: "blocked" };
    const sql = await getSql();
    await ensureProfile(sql, context.userId);
    const prof = await sql<{ display_name: string | null }>`select display_name from profiles where user_id = ${context.userId}`;
    const display = prof[0]?.display_name?.trim() || "农户";
    const rows = await sql<{ id: number }>`
      insert into posts (user_id, display_name, title, body, crop, region, problem_type)
      values (${context.userId}, ${display}, ${title}, ${body}, ${data.crop || null}, ${data.region || null}, ${data.problem || null})
      returning id
    `;
    const id = numId(rows[0]?.id);
    if (!id) return { ok: false as const, error: "save" };
    return { ok: true as const, id };
  });

export const createAnswer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { postId: number | string; body: string }) => ({ postId: numId(input.postId), body: input.body }))
  .handler(async ({ data, context }) => {
    const body = data.body.trim();
    if (body.length < 4) return { ok: false as const, error: "short" };
    if (!data.postId) return { ok: false as const, error: "gone" };
    const blocked = blockedReason(body);
    if (blocked) return { ok: false as const, error: "blocked" };
    const sql = await getSql();
    await ensureProfile(sql, context.userId);
    await sql`insert into answers (post_id, user_id, body) values (${data.postId}, ${context.userId}, ${body})`;
    return { ok: true as const };
  });

export const myProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureProfile(sql, context.userId);
    const rows = await sql<{ display_name: string; is_admin: boolean }>`
      select display_name, is_admin from profiles where user_id = ${context.userId}
    `;
    return rows[0];
  });

export const myPosts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number; title: string }>`
      select id, title from posts where user_id = ${context.userId} order by created_at desc
    `;
    return rows.map((r) => ({ ...r, id: numId(r.id) }));
  });
