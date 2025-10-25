import { isNumberString, safeParseNumber, type Solution } from "../../common";

type Instruction = { destination: string } & (
	| { type: "assignment"; value: number }
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

		const targetWire = (options?.['targetWire'] as string | undefined) ?? 'a';
		return this.evaluateInstruction(targetWire, wireInstructionsMap);
	}

	second(_input: string): number {
		return -1;
	}

	private parseInstruction(line: string): Instruction {
		const assignmentMatch = line.match(/^(\d+)\s*->\s*([a-z]+)$/im);
		if (assignmentMatch !== null) {
			const valueCandidate = assignmentMatch[1];
			const destinationCandidate = assignmentMatch[2];
			if (valueCandidate === undefined || destinationCandidate === undefined) {
				throw new Error(`Unable to parse value or destination out of ${line}`);
			}

			const [value, destination] = [parseInt(valueCandidate, 10), destinationCandidate];
			return { destination, type: "assignment", value };
		}

		const andOrMatch = line.match(/^([a-z0-9]+)\s+(AND|OR)\s+([a-z0-9]+)\s*->\s*([a-z]+)$/im);
		if (andOrMatch !== null) {
			const [leftCandidate, rightCandidate, operationCandidate, destinationCandidate] = [andOrMatch[1], andOrMatch[3], andOrMatch[2], andOrMatch[4]];
			if (leftCandidate === undefined || rightCandidate === undefined || operationCandidate === undefined || destinationCandidate === undefined) {
				throw new Error(`Unable to parse left, right, operation, or destination out of ${line}`);
			}

			return { destination: destinationCandidate, type: operationCandidate === "AND" ? "and" : "or", left: leftCandidate, right: rightCandidate };
		}

		const leftRightShift = line.match(/^([a-z0-9]+)\s+(LSHIFT|RSHIFT)\s+([a-z0-9]+)\s*->\s*([a-z]+)$/im);
		if (leftRightShift !== null) {
			const [leftCandidate, rightCandidate, operationCandidate, destinationCandidate] = [leftRightShift[1], leftRightShift[3], leftRightShift[2], leftRightShift[4]];
			if (leftCandidate === undefined || rightCandidate === undefined || operationCandidate === undefined || destinationCandidate === undefined) {
				throw new Error(`Unable to parse left, right, operation, or destination out of ${line}`);
			}

			return { destination: destinationCandidate, type: operationCandidate === "LSHIFT" ? "left_shift" : "right_shift", left: leftCandidate, right: rightCandidate };
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

	private evaluateInstruction(wire: string, wireInstructionsMap: Map<string, Instruction>): number {
		const instruction = wireInstructionsMap.get(wire);
		if (instruction === undefined) {
			throw new Error(`Instruction for wire ${wire} not found`);
		}

		switch (instruction.type) {
			case 'assignment':
				return instruction.value;
			case 'and':
				let leftValueANDResult: number;
				let rightValueANDResult: number;

				if (isNumberString(instruction.left)) {
					leftValueANDResult = safeParseNumber(instruction.left)!;
				} else {
					leftValueANDResult = this.evaluateInstruction(instruction.left, wireInstructionsMap);
				}

				if (isNumberString(instruction.right)) {
					rightValueANDResult = safeParseNumber(instruction.right)!;
				} else {
					rightValueANDResult = this.evaluateInstruction(instruction.right, wireInstructionsMap);
				}

				return leftValueANDResult & rightValueANDResult;
			case 'or':
				let leftValueORResult: number;
				let rightValueORResult: number;

				if (isNumberString(instruction.left)) {
					leftValueORResult = safeParseNumber(instruction.left)!;
				} else {
					leftValueORResult = this.evaluateInstruction(instruction.left, wireInstructionsMap);
				}

				if (isNumberString(instruction.right)) {
					rightValueORResult = safeParseNumber(instruction.right)!;
				} else {
					rightValueORResult = this.evaluateInstruction(instruction.right, wireInstructionsMap);
				}

				return leftValueORResult | rightValueORResult;

			case 'left_shift':
				let leftValueLSHIFTResult: number;
				let rightValueLSHIFTResult: number;

				if (isNumberString(instruction.left)) {
					leftValueLSHIFTResult = safeParseNumber(instruction.left)!;
				} else {
					leftValueLSHIFTResult = this.evaluateInstruction(instruction.left, wireInstructionsMap);
				}

				if (isNumberString(instruction.right)) {
					rightValueLSHIFTResult = safeParseNumber(instruction.right)!;
				} else {
					rightValueLSHIFTResult = this.evaluateInstruction(instruction.right, wireInstructionsMap);
				}

				return leftValueLSHIFTResult << rightValueLSHIFTResult;
			case 'right_shift':
				let leftValueRSHIFTResult: number;
				let rightValueRSHIFTResult: number;

				if (isNumberString(instruction.left)) {
					leftValueRSHIFTResult = safeParseNumber(instruction.left)!;
				} else {
					leftValueRSHIFTResult = this.evaluateInstruction(instruction.left, wireInstructionsMap);
				}

				if (isNumberString(instruction.right)) {
					rightValueRSHIFTResult = safeParseNumber(instruction.right)!;
				} else {
					rightValueRSHIFTResult = this.evaluateInstruction(instruction.right, wireInstructionsMap);
				}

				return leftValueRSHIFTResult >> rightValueRSHIFTResult;
			case 'not':
				let valueNOTResult: number;

				if (isNumberString(instruction.value)) {
					valueNOTResult = safeParseNumber(instruction.value)!;
				} else {
					valueNOTResult = this.evaluateInstruction(instruction.value, wireInstructionsMap);
				}

				return ~valueNOTResult;
		}
	}
}
