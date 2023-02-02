require('dotenv').config();

const LOCAL_SERVER = `http://localhost:${process.env.PORT}`;
const PRODUCTION_SERVER = process.env.PRODUCTION_SERVER;

exports.server =
  process.env.NODE_ENV === 'production' ? PRODUCTION_SERVER : LOCAL_SERVER;
