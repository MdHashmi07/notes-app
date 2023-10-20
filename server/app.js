import express from 'express';
import router from './routes/notesRouter.js';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/notes', router);