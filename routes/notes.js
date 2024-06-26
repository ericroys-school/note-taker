import { read, create, update, remove } from "../lib/util/db-api.js";
import { Router } from "express";
export const notesRouter = Router();

/**
 * Read all notes from the backend
 */
notesRouter.get("/", (req, res) => {
  read()
    .then((f) => res.status(200).json(f))
    .catch((err) => res.status(500).json(err));
});

/**
 * Create a new note in the backend and return
 * the new note with valid id
 */
notesRouter.post("/", async (req, res) => {
  if (req.body) {
    let { title, text } = req.body;

    let isErr = false;
    const i = await create(title, text).catch((err) => {
      isErr = true;
      return { error: err };
    });
    return res.status(isErr ? 500 : 200).json(i);
  } else {
    res.status(500).json({ error: "No note information provided" });
  }
});

/**
 * Delete an existing note from the backend
 */
notesRouter.delete("/:id", async (req, res) => {
  if (!req.params.id)
    res.status(404).json({ error: "An id is required for delete operations" });
  let isErr = false;
  let r = await remove(req.params.id).catch((err) => {
    isErr = true;
    return { error: err };
  });
  res.status(isErr ? 500 : 200).json(r ? r : {});
});
