import envalid from "envalid";
declare const config: Readonly<{
    JWT_SECRET: "secret";
    SENDGRID_API_KEY: string;
    URL: string;
    DB_URL: string;
    mobileLimit: 10;
    webLimit: 20;
    ROOT_URL: "http://localhost:5000";
}> & envalid.CleanEnv & {
    readonly [varName: string]: string;
};
export default config;
