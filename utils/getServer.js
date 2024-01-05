require('dotenv').config();

const BE_LOCAL_SERVER = `http://localhost:${process.env.PORT}`;
const FE_LOCAL_SERVER = `http://localhost:${process.env.FE_PORT}`;

const FE_PRODUCTION_SERVER = process.env.FE_PRODUCTION_SERVER;
const BE_PRODUCTION_SERVER = process.env.BE_PRODUCTION_SERVER;

exports.server =
  process.env.NODE_ENV === 'production'
    ? BE_PRODUCTION_SERVER
    : BE_LOCAL_SERVER;
exports.feServer =
  process.env.NODE_ENV === 'production'
    ? FE_PRODUCTION_SERVER
    : FE_LOCAL_SERVER;
