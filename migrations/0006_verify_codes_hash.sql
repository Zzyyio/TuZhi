alter table verify_codes add column if not exists code_hash text;
alter table verify_codes add column if not exists try_count integer not null default 0;
alter table verify_codes add column if not exists ip text;
alter table verify_codes add column if not exists used_at timestamptz;
alter table verify_codes add column if not exists locked_until timestamptz;
create index if not exists verify_codes_ip_created on verify_codes (ip, created_at desc);
create index if not exists verify_codes_target_created on verify_codes (target, created_at desc);
