declare global {
	var CONFIG: any;
	var HTTP_CODE: any;
	var HTTP_MESG: any;
	var HTTP_HEADER: any;
	var ERROR_CLASS: any;
	var CONSTANTS: any;
	var env: any;
	var log: any;
	var __keyPath: string;
	namespace Express {
		interface Response {
			body: any;
			headers: any;
		}
		interface Request {
			userInfo: any
		}
	}
	interface Date {
		ordinal: boolean,
		formattedDate: string
	}
}

export { };