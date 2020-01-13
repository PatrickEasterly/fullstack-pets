const db = require('./connection');

// create
function create() {

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

    console.log(allPets);
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

function update() {

}

// delete

function del() {

}

module.exports = {
    create,
    one,
    all,
    update,
    del
}
