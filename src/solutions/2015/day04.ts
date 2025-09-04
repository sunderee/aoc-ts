import { createHash } from "crypto";
import { type Solution } from "../../common";

export class Day04Year2015 implements Solution {
  first(input: string): number {
    return this.solve(input, "00000");
  }

  second(input: string): number {
    return this.solve(input, "000000");
  }

  private solve(input: string, solutionStart: string): number {
    let current = 0;
    let shouldContinue = true;
    while (shouldContinue) {
      const hashInput = `${input}${current}`;
      const hash = this.generateMD5Hash(hashInput);
      if (hash.startsWith(solutionStart)) {
        return current;
      }

      current += 1;
    }

    return current;
  }

  private generateMD5Hash(input: string): string {
    return createHash("md5").update(input).digest("hex");
  }
}
