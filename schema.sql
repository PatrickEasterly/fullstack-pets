-- What do we want to know about pets? 


create table owners (
    id serial primary key,
    name text,
    phone_number varchar(20)
    -- do owners have one and only one pet?
    -- can they have many? 
);

create table pets (
    id serial primary key,
    name text,
    -- varchar(50) [a string with fewer than 50 characters]
    species varchar(100),
    -- we can derive the age from a birthdate
    birthdate date,
    -- when you have the info in another table, ask yourself:
    -- do pets have one owner?
    -- do pets have many owners?
    -- if they have one: 
    -- USE the foreign key
    owner_id integer references owners(id)
);




-- many-to-many
-- for many-to-many, use a "linking table"
-- usually called table1_table2

create table owners_pets (
    -- this table needs no id
    owner_id integer references owners(id),
    ped_id integer references pets(id)
);
