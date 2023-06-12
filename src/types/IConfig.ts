export interface IConfig {
  environment: "production" | "stage";
  port: number;
  postgresUri: string;
  merchantBaseUrl: string;
  merchantUserName: string;
  merchantUserPassword: string;
  failUrl: string;
  returnUrl: string;
}
