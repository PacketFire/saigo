create table music (
    id integer primary key,
    file_id text not null,
    title text not null,
    fetched_by text not null,
    link text not null
);
