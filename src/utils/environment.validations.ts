import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_AUTHOR: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  APP_ROOT: Joi.string().required(),
  APP_PROD: Joi.boolean().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_SYNC: Joi.boolean().required(),
  DB_LOGGIN: Joi.boolean().required(),
  DB_LOAD_ENTITIES: Joi.boolean().required(),
  DB_KEEP_CONNECTION: Joi.boolean().required(),
  DB_MIGRATIONS: Joi.boolean().required(),
  DB_SSL: Joi.boolean().required(),
  DB_SSL_MODE: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
