
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
console.log("Keys found in .env.local:");
Object.keys(envConfig).forEach(key => {
    console.log(`- ${key}`);
});
