import App from './src/bootstrap/application';

/**
 * ===================================================================
 *                     Application Boot File
 * -------------------------------------------------------------------
 * @author: Pawan Bhadouria
 * @desc: Application boot-up file with mentioned configurations
 */

try {
    const app = new App();
    app.run();
} catch (APPException : any) {
    console.error(`Error occured while booting..!   \n# ErrorCode: ${APPException.code} \n# ErrorMessage: ${APPException.message} \n# ErrorLine: ${(APPException?.stack?.toString()?.split('\n    at')[1])?.trim()}`);
    process.exit(1);
}

process.on('uncaughtException', (err: any) => {
    const msg = (err?.stack?.toString()?.split('\n    at')[0])?.trim();
    const stack = (err?.stack?.toString()?.split('\n    at')[1])?.trim()
    console.error(`UnCaught Exception Error:\nMessage: ${msg}\nStack: ${stack}`);
});

process.on('unhandledRejection', (err: any) => {
    const msg = (err?.stack?.toString()?.split('\n    at')[0])?.trim();
    const stack = (err?.stack?.toString()?.split('\n    at')[1])?.trim()
    console.error(`UnHandled Rejection Error:\nMessage: ${msg}\nStack: ${stack}`);
});


//** dev deployment for testing commented */