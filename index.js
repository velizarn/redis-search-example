
const
  numberOfRecords = process.argv[2] || 100,
  carBrands = require('./testdata.js');

/**
 * Waits for the specified number of milliseconds.
 *
 * @param {number} milliseconds - The number of milliseconds to wait.
 * @returns {Promise<void>} - A promise that resolves after the specified number of milliseconds.
 */
function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}

/**
 * Generates records with Redis commands asynchronously.
 *
 * @returns {Promise<void>} A promise that resolves when all records are generated.
 */
async function generateRecords() {
  const promises = Array.from({ length: numberOfRecords }, async (_, i) => {
    await wait(10);
    const randomBrandIndex = Math.floor(Math.random() * carBrands.length);
    const ts = (new Date()).getTime() + i + randomBrandIndex;
    const _brand = carBrands[randomBrandIndex];
    console.log(`HSET brandRankMonth:${ts} timestamp ${ts} brand "${_brand}"`);
    console.log(`EXPIRE brandRankMonth:${ts} ${86400 - randomBrandIndex} NX\n`);
  });
  await Promise.all(promises);
}

(async () => {
  await generateRecords();
})();
