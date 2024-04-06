
const
  numberOfRecords = process.argv[2] || 100,
  carBrands = require('./testdata.js');

function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}

async function generateRecords() {
  for (let i = 0; i < numberOfRecords; i++) {
    await wait(10);
    const randomBrandIndex = Math.floor(Math.random() * carBrands.length);
    const ts = (new Date()).getTime() + i + randomBrandIndex;
    const _brand = carBrands[randomBrandIndex];
    console.log(`HSET brandRankMonth:${ts} timestamp ${ts} brand "${_brand}"`);
    console.log(`EXPIRE brandRankMonth:${ts} ${86400 - randomBrandIndex} NX\n`);
  }
}

(async () => {
  await generateRecords();
})();
