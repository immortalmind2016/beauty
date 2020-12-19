import envalid, { port, str } from 'envalid';

const config = envalid.cleanEnv(process.env, {
    JWT_SECRET: str({ default: 'secret' }),
    SENDGRID_API_KEY: str({}),
    URL: str(),
    DB_URL: str()
});

export default config;
