class InternalError extends Error {
  statusCode: number;

  constructor(message: string = 'Internal server error') {
    super(message);
    this.statusCode = 500;
  }
}

export default InternalError;