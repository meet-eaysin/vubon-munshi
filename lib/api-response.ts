export class ApiResponse<T = unknown> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T,
    public error?: unknown
  ) {}

  static success<T>(data: T, message: string = "Success") {
    return new ApiResponse(true, message, data);
  }

  static error(message: string, error?: unknown) {
    return new ApiResponse(false, message, undefined, error);
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      ...(this.data && { data: this.data }),
      ...(this.error !== undefined && { error: this.error }),
    };
  }
}
