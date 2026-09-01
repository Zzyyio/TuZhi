create table if not exists verify_codes (
  id serial primary key,
  channel text not null,
  target text not null,
  code text not null,
  expires_at timestamptz not null,
  used boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists verify_codes_lookup on verify_codes (channel, target, created_at desc);
