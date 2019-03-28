const env = process.env;

/* export a constant variable; to user we need to use {nodeEnv} */
export const nodeEnv = env.NODE_ENV || "development";

/* export object as default component */
export default {
    port: env.PORT || 1300
};
