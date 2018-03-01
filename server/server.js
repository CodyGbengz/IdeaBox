import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';

/**
 * MongoDb connection
*/
const database = require('./config/database');

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(database.url_test);
}
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(database.url_production);
}
mongoose.connect(database.url);

const {
  user, idea, comment, rating
} = routes;
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

/**
 * API routes
 */
app.use(user);
app.use(idea);
app.use(comment);
app.use(rating);
app.use('*', (req, res) => { res.send('Welcome to the IdeaBox API'); });

app.listen(port);

export default app;
