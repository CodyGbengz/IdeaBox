import path from 'path';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import routes from './routes';

/**
 * MongoDb connection for test, development and production databases
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
  user,
  idea,
  comment,
  rating
} = routes;
const port = process.env.PORT || 5000;
const app = express();
const DIST_DIR = path.join(__dirname, '../dist');
const FILE_PATH = path.join(DIST_DIR, 'index.html');

/**
 * API DOCS
 */
app.get('/api/docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'docs/index.html'));
});

app.use(
  '/api/docs-assets',
  express.static(path.resolve(__dirname, '..', 'docs'))
);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/**
 * API routes
 */
app.use(user);
app.use(idea);
app.use(comment);
app.use(rating);
// app.use('*', (req, res) => { res.send('Welcome to the IdeaBox API'); });

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
  //  A default catch-all route for serving index.html.
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/index.html')));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(FILE_PATH);
  });
}

app.listen(port);

export default app;
