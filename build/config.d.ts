import envalid from 'envalid';
declare const config: Readonly<{
    JWT_SECRET: "secret";
    SENDGRID_API_KEY: string;
    URL: string;
    DB_URL: string;
}> & envalid.CleanEnv & {
    readonly [varName: string]: string;
};
export default config;
