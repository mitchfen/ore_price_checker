const fetchURL = require("node-fetch");
const chalk = require("chalk");

import { argv } from "process";
import { dataClass } from "./dataClass";
let ores = dataClass.ores;

// Parse the price data and store in ores object
function parseData(priceData: any) {
  // Parse out the prices
  for (let i = 0; i < priceData.length; i++) {
    for (let j = 0; j < ores.length; j++) {
      // Get prices for non-compressed ores
      if (priceData[i].buy.forQuery.types[0] == ores[j].id) {
        ores[j].price = priceData[i].buy.wavg;
      } else if (priceData[i].buy.forQuery.types[0] == ores[j].compressed_id) {
        ores[j].compressed_price = priceData[i].buy.wavg;
      }
    }
  }
}

// Calculate most profitable ore and print to screen
function calculateAndPrint() {
  let bestOre = ores[0].name;
  let compressionGain = 0;
  // Bubble up the largest price
  let bestPricePerM3 = ores[0].price / ores[0].volume;
  for (let i = 1; i < ores.length; i++) {
    if (ores[i].price / ores[i].volume > bestPricePerM3) {
      bestPricePerM3 = ores[i].price / ores[i].volume;
      bestOre = ores[i].name;
      // Calculate the % gained by compression.
      // 1 Compressed ore is composed of 100 units of normal ore.
      compressionGain =
        ((ores[i].compressed_price / 100 - ores[i].price) / ores[i].price) *
        100;
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
  if (compressionGain < 0) {
    console.log(
      "Compressing your ore will decrease profits by " + chalk.red("%f%"),
      compressionGain.toFixed(2)
    );
  } else {
    console.log(
      "Compressing your ore will increase profits by " + chalk.yellow("%f%"),
      compressionGain.toFixed(2)
    );
  }
  console.log();
}

// Build up the fetch URL from the ores in ores.json
function buildURL() {
  let typeIDs: Array<number> = [];
  for (let i = 0; i < ores.length; i++) {
    typeIDs.push(ores[i].id);
    typeIDs.push(ores[i].compressed_id);
  }

  // Determine the desired region
  let region = dataClass.regions["The Forge"];
  let arg = process.argv.slice(2);
  switch (arg[0]) {
    case "hek":
      region = dataClass.regions.Metropolis;
      break;
    case "amarr":
      region = dataClass.regions.Domain;
      break;
    case "rens":
      region = dataClass.regions.Heimatar;
      break;
    case "dodixie":
      region = dataClass.regions["Sinq Laison"];
      break;
    case "jita":
      break;
    default:
      // Leave as Jita
      break;
  }

  let url = `https://api.evemarketer.com/ec/marketstat/json?regionlimit=${region}`;
  // Build the search URL
  for (let i = 0; i < typeIDs.length; i++) {
    url = url + `&typeid=${typeIDs[i]}`;
  }
  return url;
}

// Fetch and parse data from API
let url = buildURL();
fetchURL(url)
  .then((response: any) => response.json())
  .then((priceData: JSON) => parseData(priceData))
  .then(() => calculateAndPrint());
