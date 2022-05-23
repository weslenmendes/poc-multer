import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.resolve(__dirname, "..", "..", "tmp", "uploads");

    try {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
      } else {
        cb(null, dest);
      }
    } catch (err) {
      console.error(err);
    }
  },
  filename: (req, file, cb) => {
    const fileExt = file.mimetype.split("/")[1];
    const filename = `${uuid()}.${fileExt}`;

    cb(null, filename);
  },
});

export const fileFilter = (req, file, cb) => {
  const validExts = ["jpeg", "jpg", "png", "gif"];
  const fileExt = file.mimetype.split("/")[1];

  if (validExts.includes(fileExt)) {
    cb(null, true);
  }

  cb(null, false);

  // cb(new Error("Não é permitido arquivos dessa extensão."));
};
