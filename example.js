
const nsfwCheck = require('./lib/index');

const checker = new nsfwCheck();

checker.isPorn('xnxx.com').then(isPorn => {
    console.log(isPorn); 
}).catch(error => {
    console.error(error);
});
