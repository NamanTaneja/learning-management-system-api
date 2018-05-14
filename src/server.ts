import express from 'express';
import route from './routes/api/index';
import "./db";
const app=express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', route);
app.listen(1000);
