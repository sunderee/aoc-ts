import { join } from "node:path";

export async function loadInput(year: number, day: number, isTest: boolean = false): Promise<string> {
    const dayFileName = `day${day.toString().padStart(2, '0')}${isTest ? '.test.txt' : '.txt'}`
    const solutionPath = join(__dirname, '..', '..', 'data', year.toString(), dayFileName);

    return Bun.file(solutionPath).text();
}