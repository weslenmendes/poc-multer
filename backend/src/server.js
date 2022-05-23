import express, { json, urlencoded } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ msg: "Aplicação está funcionando. ;)" });
});

app.listen(port, () => {
  console.log(`🚀 Server is running in: http://localhost:${port}`);
});
