import express, { json, urlencoded } from "express";
import cors from "cors";
import multer from "multer";

import { storage, fileFilter } from "./config/multer.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const multerConfig = { storage: storage, fileFilter: fileFilter };
const upload = multer(multerConfig).single("image");

app.get("/", (req, res) => {
  res.send({ msg: "Aplicação está funcionando. ;)" });
});

app.post("/upload", upload, async (req, res) => {
  if (!req.file) {
    return res.status(422).send({ msg: "Envie um formato de arquivo válido." });
  }

  res.status(201).send({ msg: "Upload feito com sucesso!" });
});

app.listen(port, () => {
  console.log(`🚀 Server is running in: http://localhost:${port}`);
});
