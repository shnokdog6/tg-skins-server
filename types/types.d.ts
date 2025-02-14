declare global {
    interface EnvironmentVariables {
        JWT_ACCESS_KEY: string;
        JWT_REFRESH_KEY: string;
        TELEGRAM_BOT_TOKEN: string;
    }
}

export {};
