
const pets = require('./models/pets');

async function main() {
    const thePets = await pets.all();
    console.log(thePets);
}
main();