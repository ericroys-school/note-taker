import { Router } from 'express';
export const router = Router();
import { nr } from './notes.js';

router.use('/notes', nr)
