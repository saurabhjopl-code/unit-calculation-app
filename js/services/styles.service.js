import { loadCSV } from "./csv.service.js";

const NO_IMAGE = "./data/No-image.png";

/**
 * Locked size order (UI contract)
 */
const SIZE_ORDER = [
  "Free Size",
  "XS", "S", "M", "L", "XL", "XXL",
  "3XL", "4XL", "5XL", "6XL", "7XL",
  "8XL", "9XL", "10XL"
];

export async function loadStylesData() {
  const sizesCSV = await loadCSV("./data/styles-sizes.csv");
  const imagesCSV = await loadCSV("./data/styles-images.csv");

  const stylesMap = {};

  // 1️⃣ Build Style → SKU → Size map
  sizesCSV.forEach(row => {
    const sku = row["Sku Code"];
    const styleId = row["Style ID"];
    const size = row["Size"];

    if (!sku || !styleId || !size) return;

    if (!stylesMap[styleId]) {
      stylesMap[styleId] = {
        styleId,
        image: {
          url: NO_IMAGE,
          title: "",
          category: ""
        },
        skusBySize: {}
      };
    }

    stylesMap[styleId].skusBySize[size] = { sku };
  });

  // 2️⃣ Attach images (optional metadata)
  imagesCSV.forEach(row => {
    const styleId = row["Style ID"];
    if (!stylesMap[styleId]) return;

    stylesMap[styleId].image = {
      url: row["ImageLink"] || NO_IMAGE,
      title: row["Title"] || "",
      category: row["Category"] || ""
    };
  });

  // 3️⃣ Enforce size order
  Object.values(stylesMap).forEach(style => {
    const ordered = {};
    SIZE_ORDER.forEach(size => {
      if (style.skusBySize[size]) {
        ordered[size] = style.skusBySize[size];
      }
    });
    style.skusBySize = ordered;
  });

  return stylesMap;
}
