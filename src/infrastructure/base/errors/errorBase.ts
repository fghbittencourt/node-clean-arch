export default abstract class ErrorBase extends Error {
  abstract httpStatus: number;
}
