import envalid, { num, port, str, url } from "envalid";

const config = envalid.cleanEnv(process.env, {
  JWT_SECRET: str({ default: "secret" }),
  SENDGRID_API_KEY: str({}),
  URL: str(),
  DB_URL: str(),
  mobileLimit: num({ default: 10 }),
  webLimit: num({ default: 20 }),
  ROOT_URL: url({ default: "http://localhost:5000" }),
});

export default config;
