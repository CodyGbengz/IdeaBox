import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser'; 

/** 
 * express app instance
*/
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
// http request logger
app.use(logger('dev'));

app.get('*', (req, res) => {res.send('here')});

// entry point
app.listen(port);
