import path from "path";
import express from "express";
import apiRoute from "./api-route/index.mjs"
import "./helpers/db.mjs"; //実行される。
import validator from "express-validator";
import env from "dotenv";
env.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(express.json());


//API
app.use("/api", apiRoute);
app.get("*", function (req, res) {
  const indexHtml = path.resolve("build", "index.html");
  res.sendFile(indexHtml);
});
//上の処理が見つからない場合ここの処理に進むnext()があれば飛ぶけど
app.use(function (req, res) {
  res.status(404).json({ msg: "404" });
});


app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: "不正なエラーが発生しました" });
})

app.listen(PORT, function () {
  console.log(`Server start: http://localhost${PORT}`);
})
