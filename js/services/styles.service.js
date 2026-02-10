import { loadCSV } from "./csv.service.js";

const NO_IMAGE = "./data/No-image.png";

/**
 * Returns normalized styles map:
 * {
 *   ST123: { styleId, sizes[], imageUrl }
 * }
 */
export async function loadStylesData() {
  const sizesCSV = await loadCSV("./data/styles-sizes.csv");
  const imagesCSV = await loadCSV("./data/styles-images.csv");

  const stylesMap = {};

  // 1️⃣ Build sizes
  sizesCSV.forEach(row => {
    const styleId = row.style_id;
    const size = row.size;

    if (!styleId || !size) return;

    if (!stylesMap[styleId]) {
      stylesMap[styleId] = {
        styleId,
        sizes: [],
        imageUrl: NO_IMAGE
      };
    }

    if (!stylesMap[styleId].sizes.includes(size)) {
      stylesMap[styleId].sizes.push(size);
    }
  });

  // 2️⃣ Attach images
  imagesCSV.forEach(row => {
    const styleId = row.style_id;
    const imageUrl = row.image_url;

    if (!styleId || !stylesMap[styleId]) return;

    if (imageUrl) {
      stylesMap[styleId].imageUrl = imageUrl;
    }
  });

  return stylesMap;
}
