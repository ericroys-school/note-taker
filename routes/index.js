import { Router } from 'express';
export const router = Router();
import { notesRouter } from './notes.js';

router.use('/notes', notesRouter)
