-- posts: blog and talk metadata for listing and search
create table if not exists posts (
  id text primary key,
  title text not null,
  description text,
  category text not null,
  date text not null,
  type text not null default 'blog',
  tags text
);

create index idx_posts_category on posts(category);
create index idx_posts_date on posts(date desc);
create index idx_posts_type on posts(type);

-- projects: featured projects
create table if not exists projects (
  id text primary key,
  title text not null,
  description text,
  tech text,
  url text,
  preview_img_url text,
  featured integer default 0
);

-- now_entries: what i'm doing now status updates
create table if not exists now_entries (
  id integer primary key autoincrement,
  date text not null,
  location text,
  celebrate text,
  read text,
  travel text,
  learn text,
  watch text,
  listen text,
  work text
);

create index idx_now_entries_date on now_entries(date desc);

-- talks: speaking engagements populated from github
create table if not exists talks (
  id text primary key,
  title text not null,
  description text,
  event_name text,
  event_type text,
  date text,
  location text
);

create index idx_talks_date on talks(date desc);
