import { i as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { d as SENSITIVE_WORDS } from "./constants-DTRks9S4.mjs";
import { r as getSql } from "./db-BE1y4DGW.mjs";
import { t as authMiddleware } from "./middleware-DmNbtfCK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-D94jPIG5.js
/** 23 stable Q&A seeds. Dates sit between 2026-03-01 and 2026-08-29. */
var SEEDS = [
	{
		farmer: "农户3816",
		at: "2026-08-26T07:40:00+08:00",
		answerAt: "2026-08-26T16:05:00+08:00",
		title: "河北玉米底下叶子发黄，土面一层白霜",
		body: "冀中一块玉米地，底下老叶先黄，土面像撒了白粉。上周刚撒了复合肥。是缺氮还是盐碱？求对照。",
		problem: "盐碱",
		crop: "玉米",
		region: "华北",
		answer: "先别急着补氮。土面有白霜、叶缘要是也焦、上周刚施复合肥，这三样叠在一起更像盐把水抢走了。把苗拔一棵洗根看：根尖是白还是褐？白霜是薄粉还是厚壳？先停肥。有沟就小水压盐，别大水漫灌。测 0～20 厘米 EC、pH、全盐。先别做：见白霜就撒石膏、再加一把尿素。"
	},
	{
		farmer: "农户0472",
		at: "2026-08-21T09:12:00+08:00",
		answerAt: "2026-08-21T18:40:00+08:00",
		title: "黄瓜新叶发黄叶脉还绿，老叶还好",
		body: "大棚黄瓜顶端新叶黄、叶脉绿。有人说缺氮，有人说缺铁。土是偏碱的。求鉴别。",
		problem: "缺素",
		crop: "设施蔬菜",
		region: "华北",
		answer: "新叶黄、脉还绿、老叶相对还好，不像缺氮。缺氮走下部老叶。偏碱土里铁常常被锁住，根吃不到。先看根白不白、滴口旁边有没有白霜。叶面螯合铁按包装下限救急可以，土里猛撒硫酸亚铁当季常常吃不进。测 pH、有效铁。先别做：一黄就冲尿素。"
	},
	{
		farmer: "农户9261",
		at: "2026-08-14T06:55:00+08:00",
		answerAt: "2026-08-14T15:20:00+08:00",
		title: "暴雨后地里有明水，白天蔫晚上缓",
		body: "苏南菜地积水两天，叶子白天打蔫晚上又能起来，根有点臭。是涝害还是缺肥？能不能马上追尿素？",
		problem: "涝害",
		crop: "蔬菜",
		region: "长江中下游",
		answer: "土湿还蔫、白天蔫晚上缓、根有味，这是根在憋气，不是旱，更不是缺氮。先排水。新根没出来以前不要追尿素，涝后猛氮会更伤。把苗拔一棵看根是黑臭还是还有白尖。有犁底层就把水托住了，沟要挖通。测不是第一件事，先让根喘气。"
	},
	{
		farmer: "农户1583",
		at: "2026-08-09T11:30:00+08:00",
		answerAt: "2026-08-09T19:10:00+08:00",
		title: "种肥贴着种子，出苗就烧、根尖发黑",
		body: "玉米穴播把复合肥和种子拌在一个窝，出苗不齐、叶子焦。已经浇过一次水。下一步停肥还是再补？",
		problem: "肥害",
		crop: "玉米",
		region: "东北",
		answer: "种肥贴种子，出苗就焦、根尖发黑，这是烧根，沿肥带成行。已经浇过一次就先停肥，再灌清水稀释，不要补第二把。补种要离开原来的肥窝。沙土更伤。先别做：烧了还按缺肥再倒。"
	},
	{
		farmer: "农户6049",
		at: "2026-07-28T08:05:00+08:00",
		answerAt: "2026-07-28T17:22:00+08:00",
		title: "南方水稻田苗发僵，浇水有时冒锈水",
		body: "湖南一季稻，秧苗矮、根尖发褐，邻居说是酸化。想问问要不要撒石灰，撒多少才不把土改过劲。",
		problem: "酸化",
		crop: "水稻",
		region: "长江中下游",
		answer: "洗根看尖：褐秃少白尖，再加锈水，酸化和亚铁都要排。先别按邻县袋数抄石灰。取 0～20 厘米测 pH，低于大约 5.5 才改，石灰分两次，看新根再薄肥。茶园那套不要往粮田套，反过来粮田袋子也不要往茶园倒。根秃时不要猛尿素。"
	},
	{
		farmer: "农户2730",
		at: "2026-07-19T14:18:00+08:00",
		answerAt: "2026-07-19T20:45:00+08:00",
		title: "大棚番茄越种越差，膜下发白",
		body: "同一个棚种了四年番茄，今年死棵多，滴灌口旁边白霜。想问问是连作还是盐渍化。",
		problem: "连作障碍",
		crop: "设施蔬菜",
		region: "黄淮海",
		answer: "四年重茬加膜下白霜，盐和病常常一锅炖。先拔死棵看根：有瘤、褐腐还是只有白根被盐咬？滴口一圈白，EC 多半不低。能揭膜淋雨或有排水就先洗盐，薄肥。轮作换科比再买一袋菌实在。先别做：白霜上再加一把复合肥、病株留在棚里。"
	},
	{
		farmer: "农户8154",
		at: "2026-07-11T07:50:00+08:00",
		answerAt: "2026-07-11T16:30:00+08:00",
		title: "雨后土硬得像砖，苗戴帽出土",
		body: "河南麦田，下雨一包脓、天晴锄不动。根横着走，是板结还是下面有犁底层？",
		problem: "板结",
		crop: "小麦",
		region: "黄淮海",
		answer: "雨后浆、晴天砖、根横走、苗戴帽，这是路封了。刨一个坑看 20 厘米下面有没有发亮的硬盖，那就是犁底层。湿土不要进车。适墒隔年深松，刚过硬盖就停，配腐熟有机肥。先别做：泥里旋一遍、年年把生土翻上来。"
	},
	{
		farmer: "农户4902",
		at: "2026-07-03T10:05:00+08:00",
		answerAt: "2026-07-03T18:16:00+08:00",
		title: "番茄脐腐，心叶边上焦，土并不白",
		body: "冀南大棚番茄底部发黑凹进去，心叶边也焦。有人让打钙肥，有人说是病害。这几天浇水忽大忽小。",
		problem: "缺素",
		crop: "设施蔬菜",
		region: "华北",
		answer: "脐部黑凹、心叶焦、老叶还好，更像钙走不到生长点。病害脐腐会往深里烂，还常有湿度。你这几天忽干忽湿，钙更走不进去。先把水浇稳。叶面钙喷幼果和心叶，按包装下限，先小面积。酸土还要问 pH，只打叶面不够。先别做：当病害猛打药、缺钙时猛冲尿素。"
	},
	{
		farmer: "农户0367",
		at: "2026-06-25T08:40:00+08:00",
		answerAt: "2026-06-25T15:55:00+08:00",
		title: "江西红壤玉米苗矮，根尖发褐",
		body: "赣南坡地玉米，苗僵、新根少，洗出来根尖发褐发秃。土是红的。邻居石灰撒过，我不敢跟。",
		problem: "酸化",
		crop: "玉米",
		region: "华南",
		answer: "红黄壤、苗僵、根尖褐秃，先想铝在咬，不是单纯缺肥。测 pH，低于 5.5 才改。石灰分两次，看新白根再薄肥。邻居袋子不能直接抄。根还秃的时候不要猛尿素。有机质薄了酸得更快，改酸和培肥要一起想。"
	},
	{
		farmer: "农户7421",
		at: "2026-06-18T13:22:00+08:00",
		answerAt: "2026-06-18T19:48:00+08:00",
		title: "宁夏麦田出苗花斑，叶缘像开水烫",
		body: "银北一块麦田，出苗一块有一块没有，叶子边焦。土面有的地方白。井水有点咸。",
		problem: "盐碱",
		crop: "小麦",
		region: "西北",
		answer: "出苗花斑、叶缘像烫过、土面有白、井水偏咸，盐的路更直。先问有没有排水沟。没沟不要大水漫灌，盐只会抬上来。测 EC、pH、全盐，分清是咸还是涩。见白霜不要一律石膏。肥要淡。"
	},
	{
		farmer: "农户5590",
		at: "2026-06-09T09:00:00+08:00",
		answerAt: "2026-06-09T17:35:00+08:00",
		title: "东北黑土越种越浅，一抓就散",
		body: "吉林玉米地，以前土是黑的能搓团，这几年颜色发灰，一把就粉。肥得年年加。秸秆有时烧掉了。",
		problem: "有机质低",
		crop: "玉米",
		region: "东北",
		answer: "黑土变浅、一抓就散、肥效飘，是肉薄了。一袋菌一季补不回掉的黑土层。秸秆能还就还，腐熟粪少量多次，少裸冬。先别烧秸秆。测有机质和耕层厚度，心里有个数。氮再加也补不回变薄的那层肉。"
	},
	{
		farmer: "农户1184",
		at: "2026-05-30T07:15:00+08:00",
		answerAt: "2026-05-30T16:02:00+08:00",
		title: "安徽玉米车辙里不出苗",
		body: "淮北玉米，轮胎轧过的那条带不出苗，旁边垄上倒还齐。下雨辙里存水。",
		problem: "板结",
		crop: "玉米",
		region: "黄淮海",
		answer: "辙里没苗、垄上有苗、雨后辙里存水，这是碾压把路封死了。湿土不要进车。辙那一条要松开，不要整田猛翻。有机质和覆盖能把这条死土养回来一点。先别做：泥里再开一趟车把辙轧深。"
	},
	{
		farmer: "农户8633",
		at: "2026-05-21T10:44:00+08:00",
		answerAt: "2026-05-21T18:20:00+08:00",
		title: "河南玉米下部老叶匀黄，新叶还绿",
		body: "周口玉米苗，底下叶子先黄，顶上还绿。根看着还白。有人让追尿素，有人说缺锌。",
		problem: "缺素",
		crop: "玉米",
		region: "黄淮海",
		answer: "下部老叶匀黄、新叶还绿、根白，这条更像缺氮。缺锌是新叶脉间失绿、节间短、花白苗，路不一样。根白才少量多次追氮。根要是黑臭就先停。沙土不要一次倒全年。先别把花白苗和老叶匀黄混成一袋肥。"
	},
	{
		farmer: "农户3208",
		at: "2026-05-12T08:28:00+08:00",
		answerAt: "2026-05-12T15:50:00+08:00",
		title: "草莓棚点片死棵，根上有珠子",
		body: "辽南草莓棚，同一畦有的株萎了，拔出来根上鼓着珠子。肥没少施。隔壁轮作的还好。",
		problem: "连作障碍",
		crop: "设施蔬菜",
		region: "东北",
		answer: "点片死棵、根上鼓珠子、邻地轮作的好，先看线虫，不要当缺肥猛追。那些珠子不是根瘤菌。病株不要留在棚里。轮作换科最稳。用药去农技站按标签，这里不开商品名处方。测盐也看一眼，棚里常常盐和线虫一起到。"
	},
	{
		farmer: "农户9715",
		at: "2026-05-04T12:10:00+08:00",
		answerAt: "2026-05-04T19:05:00+08:00",
		title: "沙土地肥效年年飘，雨后结壳",
		body: "鲁西北沙地花生，肥下去一场雨又像没施。土色浅，一抓就散，雨后表面一层硬壳。",
		problem: "有机质低",
		crop: "花生",
		region: "黄淮海",
		answer: "沙土、肥效飘、雨后结壳，肉薄、磁力也弱。少量多次，别一次堆山。腐熟粪拌匀，覆盖少裸地。CEC 低是正常的，按黏土袋数往沙地倒会烧。先别指望一袋菌翻身。"
	},
	{
		farmer: "农户2460",
		at: "2026-04-26T09:33:00+08:00",
		answerAt: "2026-04-26T17:12:00+08:00",
		title: "皖南茶园土越种越酸，叶小",
		body: "黄山脚下茶园，叶变小、根差。有人让按麦田那样撒石灰。茶树不是怕酸吗？",
		problem: "酸化",
		crop: "茶叶",
		region: "长江中下游",
		answer: "茶树耐酸，不是越酸越好，更不要按麦田改到中性。叶小、根差，先测 pH。过酸才少量改，目标不是 7。粮田石灰袋子不能往茶园抄。有机质和覆盖比一次把土改过劲更稳。"
	},
	{
		farmer: "农户6807",
		at: "2026-04-17T07:48:00+08:00",
		answerAt: "2026-04-17T16:40:00+08:00",
		title: "山东大棚膜下白霜，越浇越蔫",
		body: "寿光黄瓜棚，揭开地膜滴口旁边一层白，越浇越蔫。底肥施得不少。",
		problem: "盐碱",
		crop: "设施蔬菜",
		region: "黄淮海",
		answer: "膜下白霜、越浇越蔫、底肥拍胸脯，这是棚这个盆把盐留下了。测 EC。能揭膜淋雨或有排水就洗。平时薄肥勤施，停生粪和高盐肥。先别做：白霜上再加一把复合肥、全年不揭膜。"
	},
	{
		farmer: "农户4051",
		at: "2026-04-08T11:05:00+08:00",
		answerAt: "2026-04-08T18:28:00+08:00",
		title: "沿江稻田水排不走，根发黑臭",
		body: "苏中沿江一季稻，田面水排不净，根黑、有臭鸡蛋味，苗发黄不发棵。是缺肥吗？",
		problem: "涝害",
		crop: "水稻",
		region: "长江中下游",
		answer: "水排不走、根黑臭、硫化氢味，这是还原层在咬根，不是缺肥。先把水放到能换气。长期潜育的田，青灰土、锈斑，肥再多根也吃不进。新根出来再薄肥。先别做：湿着猛尿素、把水层加厚。"
	},
	{
		farmer: "农户1938",
		at: "2026-03-29T08:16:00+08:00",
		answerAt: "2026-03-29T15:42:00+08:00",
		title: "滴灌越浇越伤，滴口一圈白",
		body: "河北番茄滴灌，午后更蔫，滴头旁边白圈、苗焦边。肥液按说明书配的，是不是还要再浓一点？",
		problem: "肥害",
		crop: "设施蔬菜",
		region: "华北",
		answer: "滴口白圈、越浇越蔫、焦边，这是肥液在腌根，不要再浓。先用清水滴一阵稀释，暂时停肥。测肥液和土的 EC。说明书是上限附近，棚里还要往下打折。先别做：蔫了再加浓、把滴头搬到贴根茎。"
	},
	{
		farmer: "农户5274",
		at: "2026-03-21T10:20:00+08:00",
		answerAt: "2026-03-21T17:55:00+08:00",
		title: "生鸡粪埋根边，苗像被烫",
		body: "辽宁菜地，把没腐熟的鸡粪埋在苗旁边，过两天苗焦、土还发热。已经浇过水。还能补什么肥救苗？",
		problem: "肥害",
		crop: "蔬菜",
		region: "东北",
		answer: "生粪埋根边、土发热、苗像烫过，这是未腐熟在烧。先把粪扒开，灌清水降温，停肥。不要再补一把“救苗肥”。粪要腐熟到不烫手、不熏眼再用。先别做：烧了还埋第二层生粪。"
	},
	{
		farmer: "农户0642",
		at: "2026-03-14T09:08:00+08:00",
		answerAt: "2026-03-14T16:33:00+08:00",
		title: "花生空荚多，土不白也不积水",
		body: "豫东花生，秧子看着还行，扒开荚是空的。土面没有白霜，也不积水。有人说缺钙。",
		problem: "缺素",
		crop: "花生",
		region: "黄淮海",
		answer: "秧子还行、荚空、土不白不涝，果针吸钙这条要排在前面。钙在土里也会走不进荚。先问墒稳不稳、土酸不酸。叶面钙救急，土里的钙要在果针能碰到的那一层。先别做：空荚当病害打药、不管 pH 只喷叶面。"
	},
	{
		farmer: "农户7399",
		at: "2026-03-08T13:40:00+08:00",
		answerAt: "2026-03-08T19:18:00+08:00",
		title: "化验单看不懂，pH 5.2 有机质 0.8",
		body: "手上这张单子 pH 5.2，有机质 0.8%，氮磷钾有的低有的高。想按最大量把低的全补上。河北麦田。",
		problem: "其他",
		crop: "小麦",
		region: "华北",
		answer: "阅读顺序：pH → 有机质 → 盐分 → 再氮磷钾。pH 5.2 和有机质 0.8 是房间先坏了，不要按每一项“低”的最大量补。先改极端项。带单子去农技站，按当地分级。先别做：缺什么加什么同时还在猛加已经过高的那项。"
	},
	{
		farmer: "农户8516",
		at: "2026-03-02T08:52:00+08:00",
		answerAt: "2026-03-02T16:10:00+08:00",
		title: "取样只挖了一个坑在田边",
		body: "想测土，昨天在田边粪堆旁挖了一锹就送走了。化验单马上回来。这袋土能代表我家那块地吗？",
		problem: "其他",
		crop: "玉米",
		region: "东北",
		answer: "不能。一个坑、田边、粪堆旁，代表不了这块地。S 形或棋盘 8～15 个点，0～20 厘米，避开田边粪堆，混合后四分法留一袋，写清地块作物日期。这袋先别当处方。重新取，再读 pH、有机质、盐分。"
	}
];
function blockedReason(text) {
	const t = text.replace(/\s+/g, "");
	for (const w of SENSITIVE_WORDS) if (t.includes(w)) return "内容含有不允许的信息，请修改后再发。";
	return null;
}
async function ensureProfile(sql, userId, name) {
	await sql`
    insert into profiles (user_id, display_name)
    values (${userId}, ${name || "农户"})
    on conflict (user_id) do nothing
  `;
}
async function ensureSeed(sql) {
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
	} catch {}
}
function numId(raw) {
	const n = typeof raw === "number" ? raw : Number(raw);
	return Number.isFinite(n) ? n : 0;
}
var listPosts_createServerFn_handler = createServerRpc({
	id: "07e1d96efd90f45310cc9d4bb39f141181b635cac4540aa37391da0053b5cedc",
	name: "listPosts",
	filename: "src/lib/server/community.ts"
}, (opts) => listPosts.__executeServer(opts));
var listPosts = createServerFn({ method: "POST" }).validator((input) => {
	return { problem: (input && typeof input === "object" && "problem" in input && typeof input.problem === "string" ? input.problem.trim() : "") || void 0 };
}).handler(listPosts_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSeed(sql);
	const problem = data.problem ?? null;
	return (await sql`
      select p.id, p.user_id, p.title, p.body, p.crop, p.region, p.problem_type,
             p.created_at::text as created_at,
             coalesce(nullif(p.display_name, ''), pr.display_name, '农户') as display_name,
             (select count(*)::int from answers a where a.post_id = p.id) as answer_count
      from posts p
      left join profiles pr on pr.user_id = p.user_id
      where (${problem}::text is null or p.problem_type = ${problem})
      order by p.created_at desc
      limit 50
    `).map((r) => ({
		...r,
		id: numId(r.id)
	}));
});
var getPost_createServerFn_handler = createServerRpc({
	id: "c674c7a9925a1b0fbef7c4ddb975f1161f4c38b06495243ad7a7efe1d38c5e51",
	name: "getPost",
	filename: "src/lib/server/community.ts"
}, (opts) => getPost.__executeServer(opts));
var getPost = createServerFn({ method: "POST" }).validator((input) => ({ id: numId(input.id) })).handler(getPost_createServerFn_handler, async ({ data }) => {
	if (!data.id) return {
		post: null,
		answers: []
	};
	const sql = await getSql();
	await ensureSeed(sql);
	const posts = await sql`
      select p.id, p.user_id, p.title, p.body, p.crop, p.region, p.problem_type,
             p.created_at::text as created_at,
             coalesce(nullif(p.display_name, ''), pr.display_name, '农户') as display_name,
             (select count(*)::int from answers a where a.post_id = p.id) as answer_count
      from posts p
      left join profiles pr on pr.user_id = p.user_id
      where p.id = ${data.id}
    `;
	const answers = await sql`
      select a.id, a.user_id, a.body,
             coalesce(nullif(a.display_name, ''), pr.display_name, '农户') as display_name,
             a.created_at::text as created_at
      from answers a
      left join profiles pr on pr.user_id = a.user_id
      where a.post_id = ${data.id}
      order by a.created_at asc
    `;
	return {
		post: posts[0] ? {
			...posts[0],
			id: numId(posts[0].id)
		} : null,
		answers: answers.map((a) => ({
			...a,
			id: numId(a.id)
		}))
	};
});
var createPost_createServerFn_handler = createServerRpc({
	id: "ed90876a489713663539ec087b09a60ce97f07b68d4a60499d2b3badc88ef9eb",
	name: "createPost",
	filename: "src/lib/server/community.ts"
}, (opts) => createPost.__executeServer(opts));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createPost_createServerFn_handler, async ({ data, context }) => {
	const title = data.title.trim();
	const body = data.body.trim();
	if (title.length < 4 || body.length < 8) return {
		ok: false,
		error: "short"
	};
	if (blockedReason(title + body)) return {
		ok: false,
		error: "blocked"
	};
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	const display = (await sql`select display_name from profiles where user_id = ${context.userId}`)[0]?.display_name?.trim() || "农户";
	const id = numId((await sql`
      insert into posts (user_id, display_name, title, body, crop, region, problem_type)
      values (${context.userId}, ${display}, ${title}, ${body}, ${data.crop || null}, ${data.region || null}, ${data.problem || null})
      returning id
    `)[0]?.id);
	if (!id) return {
		ok: false,
		error: "save"
	};
	return {
		ok: true,
		id
	};
});
var createAnswer_createServerFn_handler = createServerRpc({
	id: "fc8a7b7211a232b5f7055b6a78471052543ea608ad61b52714a5a5f0411dc83e",
	name: "createAnswer",
	filename: "src/lib/server/community.ts"
}, (opts) => createAnswer.__executeServer(opts));
var createAnswer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	postId: numId(input.postId),
	body: input.body
})).handler(createAnswer_createServerFn_handler, async ({ data, context }) => {
	const body = data.body.trim();
	if (body.length < 4) return {
		ok: false,
		error: "short"
	};
	if (!data.postId) return {
		ok: false,
		error: "gone"
	};
	if (blockedReason(body)) return {
		ok: false,
		error: "blocked"
	};
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await sql`insert into answers (post_id, user_id, body) values (${data.postId}, ${context.userId}, ${body})`;
	return { ok: true };
});
var myProfile_createServerFn_handler = createServerRpc({
	id: "ecc85b8dcc36673da9b41dcf3c12e55663b3a4f73bb75f963c98d12f1a60b33a",
	name: "myProfile",
	filename: "src/lib/server/community.ts"
}, (opts) => myProfile.__executeServer(opts));
var myProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myProfile_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	return (await sql`
      select display_name, is_admin from profiles where user_id = ${context.userId}
    `)[0];
});
var myPosts_createServerFn_handler = createServerRpc({
	id: "e49c5f4c744bd1307d642704000125d94cbca0f19fa03048b9032db1381eb0f4",
	name: "myPosts",
	filename: "src/lib/server/community.ts"
}, (opts) => myPosts.__executeServer(opts));
var myPosts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myPosts_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select id, title from posts where user_id = ${context.userId} order by created_at desc
    `).map((r) => ({
		...r,
		id: numId(r.id)
	}));
});
//#endregion
export { createAnswer_createServerFn_handler, createPost_createServerFn_handler, getPost_createServerFn_handler, listPosts_createServerFn_handler, myPosts_createServerFn_handler, myProfile_createServerFn_handler };
