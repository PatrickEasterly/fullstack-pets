const db = require('./connection');

// create
async function create(name, species, birthdate, owner_id) {
    const result = await db.result(`
    insert into pets
    (name, species, birthdate, owner_id)
values
    ($1, $2, $3, $4);
    `, 
    [name, species, birthdate, owner_id]
    );
    return result;
}

// retrieve
async function one(id) {
    try {
        // use .one() if there should be only one result
        // const onePet = await db.one(`select * from pets where id=${id}`);
        
        //// dont use that ^, use this >

        const onePet = await db.one(`select * from pets where id=$1`, [id]);
        console.log(onePet);
        return onePet;
    }
    catch (err) {
        return null;
    }
}

async function all() {
    const allPets = await db.query(`select * from pets`)
        .then(data=>{
            // console.log(data);
            return data;
        })
        .catch(err=>{
            console.log(err);
            return [];
        })

    // console.log(allPets);
    return allPets;
}

///// Promise version
// function all() {
//     db.query(`select * from pets`)
//         .then(data=>{
//             console.log(data);
//             return data;
//         })
//         .catch(err=>{
//             console.log(err);
//             return [];
//         })

// }

// update

async function updateName(id, name) {
    const result = await db.result(`
        update pets set 
            name=$1
        where id=$2;
    `,  [name, id]);

    if (result.rowCount===1) {
        return id;
    }
    else {
        return null;
    }
}

async function updateBirthdate(id, dateObject) {
    // postgres wants this: '2020-01-13'

    const year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    if (month < 10){
        month = `0${month}`;
    }
    let day = dateObject.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    const dateString = `${year}-${month}-${day}`;
    const result = await db.result(`
        update pets set
            birthdate=$1
        where id=$2
    `, [dateString, id]);
    return result;
}

// delete

async function del(id) {
    const result = await db.result(`delete from pets where id=$1`, [id]);
    console.log(result);
    if (result.rowCount===1) {
        return id;
    }
    else {
        return null;
    }
}

module.exports = {
    create,
    one,
    all,
    updateName,
    updateBirthdate,
    del
}
