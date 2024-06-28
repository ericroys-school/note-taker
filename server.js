
import express from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { router } from './routes/index.js';
const PORT = process.env.PORT || 3001;
const app = express();

const dir = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(express.json());
app.use("/api", router);

//serve the start page
app.get("/", (req, res) =>
  res.sendFile(path.join(dir, "/public/index.html"))
);

//serve the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(dir, "/public/notes.html"))
);

app.listen(PORT, () => console.info(`Running on port ${PORT}`));
