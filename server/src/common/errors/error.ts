export class AliceError extends Error {
  message: string;
  target: string;

  constructor(message: string, target: string) {
    super();

    this.name = "AliceError";
    this.message = message;
    this.target = target;
  }
}
