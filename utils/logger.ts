export class Logger {
    static info(message: string) {
        console.log(`\x1b[36m[INFO]\x1b[0m ${message}`);
    }

    static success(message: string) {
        console.log(`\x1b[32m[SUCCESS]\x1b[0m ${message}`);
    }

    static warning(message: string) {
        console.log(`\x1b[33m[WARNING]\x1b[0m ${message}`);
    }

    static error(message: string) {
        console.log(`\x1b[31m[ERROR]\x1b[0m ${message}`);
    }
}