import { executeTippecanoeCommand } from "./utils.js";

/**
 * Generates a vector tileset at `/tilesOutputPath` from the LDGeoJSON saved at `/inputLDGeoJsonPath`
 *
 * @param {string} inputLDGeoJsonPath
 * @param {string} tilesOutputPath
 * @param {string} vectorLayerName
 * @param {number} minZoom
 * @param {boolean} shouldSimplifyLines
 * @param {boolean} dontDropPoints
 * @returns {Promise<void>} Resolves when the tileset generation is complete
 */
export default async function runTippecanoe(
  inputLDGeoJsonPath,
  tilesOutputPath,
  vectorLayerName,
  minZoom,
  shouldSimplifyLines,
  dontDropPoints
) {
  const params = [
    "-e",
    tilesOutputPath,
    "-l",
    vectorLayerName,
    "-P",
    `-Z${minZoom}`,
    "-U",
    3,
  ];
  if (shouldSimplifyLines) {
    params.push("-S", "15");
  }
  if (dontDropPoints) {
    params.push("-r", "0", "-g", "0");
  }
  params.push(inputLDGeoJsonPath);

  return executeTippecanoeCommand(params);
}
