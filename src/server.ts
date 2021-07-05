import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";
import { renderFile } from "ejs";

const app = express();
const viewsPath = path.resolve(__dirname, "views");

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(express.static("public"));

app.set("view engine", "html");
app.set("views", viewsPath);

app.engine("html", renderFile);

app.listen(3000, () => {
  console.log("server started sucessfully");
});
