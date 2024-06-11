import express, { Application } from "express";
import path from 'path';
import routes from "./controllers";
import db from "./config/connection";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app: Application = express();

console.log("Server starting...");
db.on("error", (error: any) => console.error(error));
db.once("open", () => console.log("Connected to db"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://hometownharvest-91162a140111.herokuapp.com'] ,
    credentials: true
}));

app.use(cookieParser());

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

export default app;