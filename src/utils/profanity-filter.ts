import ObscFilter from "bad-words";
import { BadRequestError } from "../errors/bad-request-error";

class Filter {
  private filterObj: ObscFilter;

  constructor() {
    this.filterObj = new ObscFilter();
    this.filterObj.addWords("suck");
  }

  isUnfit(obj: Object) {
    const key = Object.keys(obj)[0];
    const value: string = Object.values(obj)[0];
    const isBad = this.filterObj.isProfane(value);
    if (isBad) {
      throw new BadRequestError(`${key} voilates UGH profanity rules`);
    } else {
      const words = value.split("");
      for (let i = 0; i < words.length; i++) {
        let word = "";
        for (let j = i; j < words.length; j++) {
          word += words[j];
          if (this.filterObj.isProfane(word)) {
            throw new BadRequestError(`${key} voilates UGH profanity rules`);
          }
        }
      }
    }
  }
}

export const filter = new Filter();
