import express from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";
import RateLimit from 'express-rate-limit';
import bodyParser from "body-parser";
import Routes from './routes/index.js'
import './database.js';

dotenvConfig();

const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});

const app = express();
const PORT = process.env.PORT;

app.use(limiter);
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(PORT, () => {
    Routes(app);
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
