import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import indexRoutes from './routes/index.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();
connectDB();

const app = express();

// Global middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);   // register & login
app.use('/', indexRoutes);          // welcome page still works


// 404 & error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);
