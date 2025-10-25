import { isNumberString, type Solution, safeParseNumber } from "../../common";

type Instruction = { destination: string } & (
    | { type: "assignment"; value: string }
    | { type: "and"; left: string; right: string }
    | { type: "or"; left: string; right: string }
    | { type: "right_shift"; left: string; right: string }
    | { type: "left_shift"; left: string; right: string }
    | { type: "not"; value: string }
);

export class Day07Year2015 implements Solution {
    first(input: string, options?: { [key: string]: unknown }): number {
        const wireInstructionsMap = new Map<string, Instruction>();
        const parsedWireInstructions = input.split("\n").map((item) => this.parseInstruction(item));
        for (const wireInstruction of parsedWireInstructions) {
            wireInstructionsMap.set(wireInstruction.destination, wireInstruction);
        }

        const targetWire = (options?.["targetWire"] as string | undefined) ?? "a";
        const cache = new Map<string, number>();
        const evaluating = new Set<string>();
        return this.evaluateInstruction(targetWire, wireInstructionsMap, cache, evaluating);
    }

    second(input: string, options?: { [key: string]: unknown }): number {
        const overrideTargetWire = (options?.["overrideTargetWire"] as string | undefined) ?? "b";
        const overrideValue = (options?.["overrideValue"] as number | undefined) ?? 0;

        const modifiedInput = input.replace(/^[a-z0-9]+\s*->\s*b$/gim, `${overrideValue} -> ${overrideTargetWire}`);
        return this.first(modifiedInput, options);
    }

    private parseInstruction(line: string): Instruction {
        const assignmentMatch = line.match(/^([a-z0-9]+)\s*->\s*([a-z]+)$/im);
        if (assignmentMatch !== null) {
            const valueCandidate = assignmentMatch[1];
            const destinationCandidate = assignmentMatch[2];
            if (valueCandidate === undefined || destinationCandidate === undefined) {
                throw new Error(`Unable to parse value or destination out of ${line}`);
            }

            return { destination: destinationCandidate, type: "assignment", value: valueCandidate };
        }

        const andOrMatch = line.match(/^([a-z0-9]+)\s+(AND|OR)\s+([a-z0-9]+)\s*->\s*([a-z]+)$/im);
        if (andOrMatch !== null) {
            const [leftCandidate, rightCandidate, operationCandidate, destinationCandidate] = [
                andOrMatch[1],
                andOrMatch[3],
                andOrMatch[2],
                andOrMatch[4],
            ];
            if (
                leftCandidate === undefined ||
                rightCandidate === undefined ||
                operationCandidate === undefined ||
                destinationCandidate === undefined
            ) {
                throw new Error(`Unable to parse left, right, operation, or destination out of ${line}`);
            }

            return {
                destination: destinationCandidate,
                type: operationCandidate === "AND" ? "and" : "or",
                left: leftCandidate,
                right: rightCandidate,
            };
        }

        const leftRightShift = line.match(/^([a-z0-9]+)\s+(LSHIFT|RSHIFT)\s+([a-z0-9]+)\s*->\s*([a-z]+)$/im);
        if (leftRightShift !== null) {
            const [leftCandidate, rightCandidate, operationCandidate, destinationCandidate] = [
                leftRightShift[1],
                leftRightShift[3],
                leftRightShift[2],
                leftRightShift[4],
            ];
            if (
                leftCandidate === undefined ||
                rightCandidate === undefined ||
                operationCandidate === undefined ||
                destinationCandidate === undefined
            ) {
                throw new Error(`Unable to parse left, right, operation, or destination out of ${line}`);
            }

            return {
                destination: destinationCandidate,
                type: operationCandidate === "LSHIFT" ? "left_shift" : "right_shift",
                left: leftCandidate,
                right: rightCandidate,
            };
        }

        const notMatch = line.match(/^NOT\s+([a-z0-9]+)\s*->\s*([a-z]+)$/im);
        if (notMatch !== null) {
            const valueCandidate = notMatch[1];
            const destinationCandidate = notMatch[2];
            if (valueCandidate === undefined || destinationCandidate === undefined) {
                throw new Error(`Unable to parse value or destination out of ${line}`);
            }

            return { destination: destinationCandidate, type: "not", value: valueCandidate };
        }

        throw new Error(`Unable to parse line: ${line}`);
    }

    private evaluateInstruction(
        wire: string,
        wireInstructionsMap: Map<string, Instruction>,
        cache: Map<string, number>,
        evaluating: Set<string>,
    ): number {
        if (evaluating.has(wire)) {
            throw new Error(`Circular dependency detected for wire: ${wire}`);
        }

        if (cache.has(wire)) {
            const cachedValue = cache.get(wire);
            if (cachedValue === undefined) {
                throw new Error(`Cached value for wire ${wire} is undefined`);
            }
            return cachedValue;
        }

        const instruction = wireInstructionsMap.get(wire);
        if (instruction === undefined) {
            throw new Error(`Instruction for wire ${wire} not found`);
        }

        evaluating.add(wire);

        let result: number;
        switch (instruction.type) {
            case "assignment":
                if (isNumberString(instruction.value)) {
                    const parsedValue = safeParseNumber(instruction.value);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.value}`);
                    }
                    result = parsedValue;
                } else {
                    result = this.evaluateInstruction(instruction.value, wireInstructionsMap, cache, evaluating);
                }
                break;
            case "and": {
                let leftValueANDResult: number;
                let rightValueANDResult: number;

                if (isNumberString(instruction.left)) {
                    const parsedValue = safeParseNumber(instruction.left);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.left}`);
                    }
                    leftValueANDResult = parsedValue;
                } else {
                    leftValueANDResult = this.evaluateInstruction(
                        instruction.left,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                if (isNumberString(instruction.right)) {
                    const parsedValue = safeParseNumber(instruction.right);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.right}`);
                    }
                    rightValueANDResult = parsedValue;
                } else {
                    rightValueANDResult = this.evaluateInstruction(
                        instruction.right,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                result = leftValueANDResult & rightValueANDResult;
                break;
            }
            case "or": {
                let leftValueORResult: number;
                let rightValueORResult: number;

                if (isNumberString(instruction.left)) {
                    const parsedValue = safeParseNumber(instruction.left);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.left}`);
                    }
                    leftValueORResult = parsedValue;
                } else {
                    leftValueORResult = this.evaluateInstruction(
                        instruction.left,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                if (isNumberString(instruction.right)) {
                    const parsedValue = safeParseNumber(instruction.right);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.right}`);
                    }
                    rightValueORResult = parsedValue;
                } else {
                    rightValueORResult = this.evaluateInstruction(
                        instruction.right,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                result = leftValueORResult | rightValueORResult;
                break;
            }

            case "left_shift": {
                let leftValueLSHIFTResult: number;
                let rightValueLSHIFTResult: number;

                if (isNumberString(instruction.left)) {
                    const parsedValue = safeParseNumber(instruction.left);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.left}`);
                    }
                    leftValueLSHIFTResult = parsedValue;
                } else {
                    leftValueLSHIFTResult = this.evaluateInstruction(
                        instruction.left,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                if (isNumberString(instruction.right)) {
                    const parsedValue = safeParseNumber(instruction.right);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.right}`);
                    }
                    rightValueLSHIFTResult = parsedValue;
                } else {
                    rightValueLSHIFTResult = this.evaluateInstruction(
                        instruction.right,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                result = leftValueLSHIFTResult << rightValueLSHIFTResult;
                break;
            }
            case "right_shift": {
                let leftValueRSHIFTResult: number;
                let rightValueRSHIFTResult: number;

                if (isNumberString(instruction.left)) {
                    const parsedValue = safeParseNumber(instruction.left);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.left}`);
                    }
                    leftValueRSHIFTResult = parsedValue;
                } else {
                    leftValueRSHIFTResult = this.evaluateInstruction(
                        instruction.left,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                if (isNumberString(instruction.right)) {
                    const parsedValue = safeParseNumber(instruction.right);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.right}`);
                    }
                    rightValueRSHIFTResult = parsedValue;
                } else {
                    rightValueRSHIFTResult = this.evaluateInstruction(
                        instruction.right,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                result = leftValueRSHIFTResult >> rightValueRSHIFTResult;
                break;
            }
            case "not": {
                let valueNOTResult: number;

                if (isNumberString(instruction.value)) {
                    const parsedValue = safeParseNumber(instruction.value);
                    if (parsedValue === undefined) {
                        throw new Error(`Unable to parse value for wire ${wire}: ${instruction.value}`);
                    }
                    valueNOTResult = parsedValue;
                } else {
                    valueNOTResult = this.evaluateInstruction(
                        instruction.value,
                        wireInstructionsMap,
                        cache,
                        evaluating,
                    );
                }

                result = ~valueNOTResult & 0xffff;
                break;
            }
        }

        evaluating.delete(wire);
        cache.set(wire, result);
        return result;
    }
}
