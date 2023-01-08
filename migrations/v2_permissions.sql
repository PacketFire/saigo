create table if not exists permissions (
    id integer primary key autoincrement,
    username text not null,
    auth_type text not null
);

insert into permissions (username, auth_type) values('brock', 'owner');
insert into permissions (username, auth_type) values('rags', 'owner');