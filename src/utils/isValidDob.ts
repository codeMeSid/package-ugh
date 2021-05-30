import { BadRequestError } from "../errors/bad-request-error";

export const isValidDob = (dob: string | Date) => {
  const msIn1Sec = 1000;
  const secIn1Min = msIn1Sec * 60;
  const minIn1Hr = 60 * secIn1Min;
  const hrsIn1Day = 24 * minIn1Hr;
  const daysIn1Year = 365 * hrsIn1Day;

  const sd = new Date(dob).valueOf();
  const cd = new Date().valueOf();

  if (cd - sd < daysIn1Year * 16) {
    throw new BadRequestError("Minimum age requirement 16 years");
  }
  return new Date(sd);
};
