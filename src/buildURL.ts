// Build up the fetch URL from the ores in ores.json
export function buildURL(ores: any) {
  let typeIDs: Array<string> = [];
  for (let i = 0; i < ores.length; i++) {
    typeIDs.push(ores[i].id);
    typeIDs.push(ores[i].compressed_id);
  }
  let regionLimit = "10000002"; // Value for "The Forge" - Jita trade hub
  let url = `https://api.evemarketer.com/ec/marketstat/json?regionlimit=${regionLimit}`;
  // Build the search URL
  for (let i = 0; i < typeIDs.length; i++) {
    url = url + `&typeid=${typeIDs[i]}`;
  }
  return url;
}
