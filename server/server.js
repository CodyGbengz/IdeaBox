import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';


/**
 * express app instance
*/
dotenv.config();
const database = require('./config/database');

mongoose.connect(database.url);
const { user, idea } = routes;
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http request logger
app.use(logger('dev'));
/**
 * API routes
 */
app.use(user);
app.use(idea);

app.get('*', (req, res) => { res.send('here'); });

// entry point
app.listen(port);

export default app;
