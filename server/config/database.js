import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  url: process.env.DEV_DB,
  url_production: process.env.MONGODB_URI,
  url_test: process.env.TEST_DB
};
