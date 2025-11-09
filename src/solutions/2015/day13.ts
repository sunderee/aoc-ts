import type { Solution } from "../../common";
import { permutations } from "../../common/utilities/permutations";

interface HappinessLine {
    person: string;
    neighbor: string;
    happiness: number;
}

interface HappinessAtSeat {
    index: number;
    person: string;
    happiness: number;
}

export class Day13Year2015 implements Solution {
    first(input: string): number {
        const parsedHappinessLines = input.split("\n").map((input) => this.parseLine(input));
        const uniquePeopleSet = new Set(parsedHappinessLines.map((line) => line.person));
        const allPeopleArrangements = permutations<string>(Array.from(uniquePeopleSet));

        const allHappinessSums = allPeopleArrangements.map((peopleArrangement) =>
            this.calculateHappinessAtSeats(parsedHappinessLines, peopleArrangement).reduce(
                (accumulator, seat) => accumulator + seat.happiness,
                0,
            ),
        );
        return allHappinessSums.reduce((accumulator, happinessSum) => Math.max(accumulator, happinessSum), -Infinity);
    }

    second(input: string): number {
        const parsedHappinessLines = input.split("\n").map((input) => this.parseLine(input));
        parsedHappinessLines.push({
            person: "You",
            neighbor: "",
            happiness: 0,
        });

        const uniquePeopleSet = new Set(parsedHappinessLines.map((line) => line.person));
        const allPeopleArrangements = permutations<string>(Array.from(uniquePeopleSet));

        const allHappinessSums = allPeopleArrangements.map((peopleArrangement) =>
            this.calculateHappinessAtSeats(parsedHappinessLines, peopleArrangement).reduce(
                (accumulator, seat) => accumulator + seat.happiness,
                0,
            ),
        );
        return allHappinessSums.reduce((accumulator, happinessSum) => Math.max(accumulator, happinessSum), -Infinity);
    }

    private parseLine(line: string): HappinessLine {
        // Regular expression to parse name, gain/lose, number, and neighbor
        const regex = /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./;
        const match = line.match(regex);
        if (match === null) {
            throw new Error(`Unable to parse line: ${line}`);
        }

        return {
            person: match[1] as string,
            neighbor: match[4] as string,
            happiness: match[2] === "gain" ? parseInt(match[3] as string, 10) : -parseInt(match[3] as string, 10),
        } satisfies HappinessLine;
    }

    private calculateHappinessAtSeats(happinessLines: HappinessLine[], peopleArrangement: string[]): HappinessAtSeat[] {
        const result: HappinessAtSeat[] = [];
        for (let i = 0; i < peopleArrangement.length; i++) {
            const seat = i;
            const person = peopleArrangement[i];
            if (person === undefined) {
                throw new Error(`Person is undefined at seat ${i}`);
            }

            // Neighbor to the left is either previous seat, or the last seat if the current seat is the first seat
            const neighborToTheLeft =
                i === 0 ? peopleArrangement[peopleArrangement.length - 1] : peopleArrangement[i - 1];

            // Neighbor to the right is either next seat, or the first seat if the current seat is the last seat
            const neighborToTheRight =
                i === peopleArrangement.length - 1 ? peopleArrangement[0] : peopleArrangement[i + 1];

            // Happiness is the sum of the happiness of the person with the neighbor to the left and the neighbor to the right
            const happiness =
                (happinessLines.find((line) => line.person === person && line.neighbor === neighborToTheLeft)
                    ?.happiness ?? 0) +
                (happinessLines.find((line) => line.person === person && line.neighbor === neighborToTheRight)
                    ?.happiness ?? 0);

            result.push({
                index: seat,
                person: person,
                happiness: happiness,
            });
        }

        return result;
    }
}
