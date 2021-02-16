// Build up the fetch URL from the ores in ores.json
export function buildURL(ores: any) {
  let typeIDs: Array<string> = require("../JSON/types.json");
  let regionLimit = "10000002"; // Value for "The Forge" - Jita trade hub
  let url = `https://api.evemarketer.com/ec/marketstat/json?regionlimit=${regionLimit}`;
  // Build the search URL
  for (let i = 0; i < typeIDs.length; i++) {
    url = url + `&typeid=${typeIDs[i]}`;
  }
  return url;
}
