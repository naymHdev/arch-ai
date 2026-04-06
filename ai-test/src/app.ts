import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', project: 'ai-test' });
});

// TODO: Import and register your routes here
// import { authRouter } from './routes/auth.routes';
// app.use('/api/auth', authRouter);

export default app;
