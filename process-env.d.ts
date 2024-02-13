export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      // add more environment variables and their types here
      SESS_SECRET: any;
      DATABASE_NAME: any;
      DATABASE_USERNAME: any;
      DATABASE_PASSWORD: any;
      DATABASE_HOSTING: any;
    }
  }
}
