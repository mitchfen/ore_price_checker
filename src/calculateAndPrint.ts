// Calculate most profitable ore and print to screen
export function calculateAndPrint(ores: any) {
  const chalk = require("chalk");
  let bestOre = ores[0].name;
  let compressionGain = null;
  // Bubble sort to find the best ore
  let bestPricePerM3 = ores[0].price / ores[0].volume;
  for (let i = 1; i < ores.length; i++) {
    if (ores[i].price / ores[i].volume > bestPricePerM3) {
      bestPricePerM3 = ores[i].price / ores[i].volume;
      bestOre = ores[i].name;
      // Calculate the % gained by compression.
      // 1 Compressed ore is composed of 100 units of normal ore.
      compressionGain = (
        ((ores[i].compressed_price / 100 - ores[i].price) / ores[i].price) *
        100
      ).toFixed(2);
    }
  }
  // Print results to screen
  console.table(ores);
  console.log(
    "The most profitable ore to mine today is: " +
      chalk.green(bestOre) +
      " at " +
      chalk.green("%i ISK/m3"),
    bestPricePerM3
  );
  console.log(
    "You can compress it to increase profits by " + chalk.yellow("%f%"),
    compressionGain
  );
  console.log();
}
