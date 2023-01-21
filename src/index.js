const app = require('./app');
require('./database');


async function main() {
    //Initialize Server
    await app.listen(app.get('PORT'));
    console.log(`Server ${app.get('AppName')} in Port ${app.get('PORT')}`);
};

main();