import * as env from "env-var";

import { IConfig } from "./types/IConfig";

const getConfig = (): IConfig => {
  try {
    const config = {
      environment: env
        .get("ENVIRONMENT")
        .required()
        .asEnum(["stage", "production"]),
      port: env.get("PORT").required().default(3000).asPortNumber(),
      postgresUri: env.get("POSTGRES_URI").required().asString(),
      merchantUserName: env
        .get("MERCHANT_USER_NAME")
        .required()
        .default("test")
        .asString(),
      merchantUserPassword: env
        .get("MERCHANT_PASSWORD")
        .required()
        .default("test")
        .asString(),
      failUrl: env
        .get("URL_ON_FAILURE")
        .required()
        .default("http://bad-url")
        .asUrlString(),
      returnUrl: env
        .get("URL_ON_SUCCESS")
        .required()
        .default("http://good-url")
        .asUrlString(),
      merchantBaseUrl: env.get("MERCHANT_BASE_URL").required().asUrlString(),
    };

    return config;
  } catch (error: unknown) {
    const err = error as { message: string };
    console.error({ msg: "misconfiguration", error_message: err.message });
    process.exit(1);
  }
};

const config = getConfig();

export default config;
