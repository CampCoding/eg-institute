import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const inputDir = path.join(process.cwd(), "public", "apiimages");

// هنحفظ الـ webp في نفس فولدر الصور
const outputDir = inputDir;

const QUALITY = 72;
const MAX_WIDTH = 1600;

// خليه true لو عايز يمسح صور png/jpg بعد التحويل
// أنا سايبه false عشان الأصول تفضل موجودة بأمان
const DELETE_ORIGINALS = false;

const allowedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".avif",
  ".tif",
  ".tiff",
  ".bmp",
]);

async function getImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getImages(fullPath);
      }

      const ext = path.extname(entry.name).toLowerCase();

      if (entry.isFile() && allowedExtensions.has(ext)) {
        return fullPath;
      }

      return [];
    })
  );

  return files.flat();
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function convertImage(filePath) {
  const parsed = path.parse(filePath);
  const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);

  const inputStats = await fs.stat(filePath);

  let image = sharp(filePath).rotate();

  if (MAX_WIDTH) {
    image = image.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });
  }

  await image
    .webp({
      quality: QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const outputStats = await fs.stat(outputPath);

  const savedPercent = (
    ((inputStats.size - outputStats.size) / inputStats.size) *
    100
  ).toFixed(1);

  console.log(
    `✅ ${path.basename(filePath)} -> ${path.basename(outputPath)} | ${formatKB(
      inputStats.size
    )} -> ${formatKB(outputStats.size)} | Saved ${savedPercent}%`
  );

  if (DELETE_ORIGINALS) {
    await fs.unlink(filePath);
    console.log(`🗑️ Deleted original: ${path.basename(filePath)}`);
  }
}

async function main() {
  try {
    await fs.access(inputDir);
  } catch {
    console.error(`❌ Folder not found: ${inputDir}`);
    process.exit(1);
  }

  const images = await getImages(inputDir);

  if (!images.length) {
    console.log("⚠️ مفيش صور PNG/JPG/etc جوه public/apiimages");
    return;
  }

  console.log(`🚀 Found ${images.length} image(s). Converting...\n`);

  for (const image of images) {
    try {
      await convertImage(image);
    } catch (error) {
      console.error(`❌ Failed: ${image}`);
      console.error(error.message);
    }
  }

  console.log("\n🎉 Done. الصور اتحولت لـ WebP في نفس الفولدر.");
}

main();