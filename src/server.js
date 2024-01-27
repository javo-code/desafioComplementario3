import './config/connection.js';
import express from 'express';
import morgan from 'morgan';
import MainRouter from "./routes/index.js";
const mainRouter = new MainRouter();
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

