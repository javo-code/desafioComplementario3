import './config/connection.js';
import express from 'express';
import morgan, { compile } from 'morgan';
import MainRouter from "./routes/index.js";
const mainRouter = new MainRouter();
import { errorHandler } from './middlewares/errorHandler.js';
import { Command } from "commander";
import "dotenv/config.js";

const app = express();

const commander = new Command();

commander.option("-m <mode>", "mode server", "dev")
commander.parse();

console.log("options", commander.opts());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

const PORT = process.argv[2] || 8080;
const mode = commander.opts().m

app.listen(PORT, () => {
    console.log(`SERVER UP ON PORT ${PORT}`);
    console.log(`Mode: ${mode}`);
});

