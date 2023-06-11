import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { routes } from "./router"

dotenv.config();

const app: Express = express()
const port = Number(process.env.SERVER_PORT || 8080)
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
    res.send('pong')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})