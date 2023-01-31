const currEnv = import.meta.env.APP_ENV;

export const isProd = currEnv == "production";
export const isTest = currEnv == "test";
export const isDev = currEnv == "development";
