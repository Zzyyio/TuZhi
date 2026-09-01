create table if not exists profiles (
  user_id text primary key,
  display_name text,
  phone text,
  is_admin boolean not null default false,
  points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id serial primary key,
  user_id text not null,
  display_name text not null default '农户',
  title text not null,
  body text not null,
  problem_type text,
  crop text,
  region text,
  created_at timestamptz not null default now()
);
create index if not exists posts_created_idx on posts (created_at desc);

create table if not exists answers (
  id serial primary key,
  post_id integer not null references posts(id) on delete cascade,
  user_id text not null,
  display_name text not null default '农户',
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists answers_post_idx on answers (post_id);

create table if not exists likes (
  user_id text not null,
  answer_id integer not null references answers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, answer_id)
);

create table if not exists reports (
  id serial primary key,
  user_id text not null,
  target_type text not null,
  target_id text not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists diagnose_logs (
  id serial primary key,
  user_id text,
  question text,
  has_image boolean not null default false,
  created_at timestamptz not null default now()
);

insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '河北玉米底下叶子发黄，土面一层白霜',
  '冀中一块玉米地，底下老叶先黄，土面像撒了白粉。上周刚撒了复合肥。是缺氮还是盐碱？求对照。',
  '盐碱', '玉米', '华北'
where not exists (select 1 from posts where title like '河北玉米底下叶子发黄%');

insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '大棚番茄越种越差，膜下发白',
  '同一个棚种了四年番茄，今年死棵多，滴灌口旁边白霜。想问问是连作还是盐渍化。',
  '连作障碍', '设施蔬菜', '黄淮海'
where not exists (select 1 from posts where title like '大棚番茄越种越差%');
