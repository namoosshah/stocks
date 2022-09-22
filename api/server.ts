import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import companyRoutes from './routes/companies';

dotenv.config();

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/', companyRoutes);

const port: Number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
