import path from 'path';
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
/**
 * API DOCS
 */
app.get('/api/docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'docs/index.html'));
});

app.use('/api/docs-assets', express.static(path.resolve(__dirname, '..', 'docs')));

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
