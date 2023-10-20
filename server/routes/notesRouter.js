import express from 'express';
import { getAllNotes, createNotes, getNote, updateNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.route('/get-all-notes').get(getAllNotes);
router.route('/create-note').post(createNotes);
router.route('/get-note/:id').get(getNote).put(updateNote).delete(deleteNote);

export default router;