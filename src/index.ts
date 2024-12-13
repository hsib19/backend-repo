import express from "express";
import cors from 'cors';


import userRoutes from '../routes/userRoutes';
import { authenticateUser } from '../middleware/authMiddleware';

const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

app.use('/api', authenticateUser, userRoutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});