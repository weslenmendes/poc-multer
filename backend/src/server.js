import express, { json, urlencoded } from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ msg: "Aplicação está funcionando. ;)" });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file);

  const filename = `${uuid()}.${req.file.mimetype.split("/")[1]}`;
  const pathAnterior = req.file.path;
  const pathAtual = `${req.file.path.split("/")[0]}/${filename}`;

  await fs.rename(pathAnterior, pathAtual, (e) => {
    if (e) {
      console.log("Ocorreu um erro.");
    }

    console.log("Arquivo renomeado com sucesso!");
  });

  res.status(201).send({ msg: "Upload feito com sucesso!" });
});

app.listen(port, () => {
  console.log(`🚀 Server is running in: http://localhost:${port}`);
});
