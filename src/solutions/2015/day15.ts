import type { Solution } from "../../common";

type Ingredient = {
    name: string;
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
    calories: number;
};

export class Day15Year2015 implements Solution {
    first(input: string): number {
        const ingredients = input
            .split("\n")
            .filter((line) => line.length > 0)
            .map((line) => this.parseIngredient(line));

        let bestScore = 0;

        for (const amounts of this.distribute(ingredients.length, 100)) {
            const score = this.calculateScoreMinusCalories(ingredients, amounts);
            if (score > bestScore) {
                bestScore = score;
            }
        }

        return bestScore;
    }

    second(input: string): number {
        const ingredients = input
            .split("\n")
            .filter((line) => line.length > 0)
            .map((line) => this.parseIngredient(line));

        let bestScore = 0;

        for (const amounts of this.distribute(ingredients.length, 100)) {
            const score = this.calculateScoreWith500Calories(ingredients, amounts);
            if (score > bestScore) {
                bestScore = score;
            }
        }

        return bestScore;
    }

    private parseIngredient(line: string): Ingredient {
        const ingredientRegex =
            /^([a-zA-Z]+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/;
        const match = line.match(ingredientRegex);
        if (match === null) {
            throw new Error(`Invalid ingredient: ${line}`);
        }

        return {
            name: match[1] as string,
            capacity: parseInt(match[2] as string, 10),
            durability: parseInt(match[3] as string, 10),
            flavor: parseInt(match[4] as string, 10),
            texture: parseInt(match[5] as string, 10),
            calories: parseInt(match[6] as string, 10),
        };
    }

    private calculateScoreMinusCalories(ingredients: Ingredient[], teaspoons: number[]): number {
        let capacity = 0;
        let durability = 0;
        let flavor = 0;
        let texture = 0;

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const amount = teaspoons[i];

            if (!ingredient || amount === undefined) {
                continue;
            }

            capacity += ingredient.capacity * amount;
            durability += ingredient.durability * amount;
            flavor += ingredient.flavor * amount;
            texture += ingredient.texture * amount;
        }

        capacity = Math.max(0, capacity);
        durability = Math.max(0, durability);
        flavor = Math.max(0, flavor);
        texture = Math.max(0, texture);

        return capacity * durability * flavor * texture;
    }

    private calculateScoreWith500Calories(ingredients: Ingredient[], teaspoons: number[]): number {
        let calories = 0;

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const amount = teaspoons[i];

            if (!ingredient || amount === undefined) {
                continue;
            }

            calories += ingredient.calories * amount;
        }

        if (calories !== 500) {
            return 0;
        }

        return this.calculateScoreMinusCalories(ingredients, teaspoons);
    }

    private *distribute(n: number, total: number): Generator<number[]> {
        if (n < 1) return;
        if (n === 1) {
            yield [total];
            return;
        }
        for (let i = 0; i <= total; i++) {
            for (const rest of this.distribute(n - 1, total - i)) {
                yield [i, ...rest];
            }
        }
    }
}
