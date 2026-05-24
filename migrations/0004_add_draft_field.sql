-- add draft field to posts for filtering production vs draft content
alter table posts add column draft integer default 0;

create index idx_posts_draft on posts(draft);
