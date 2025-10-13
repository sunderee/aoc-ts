import { type Point2D, Point2DSet, type Solution } from "../../common";

enum LightCommand {
	toggle,
	turnOn,
	turnOff,
}
type ParsedCommand = { command: LightCommand; from: Point2D; to: Point2D };

export class Day06Year2015 implements Solution {
	first(input: string): number {
		const turnedOnLights = new Point2DSet();
		input
			.split("\n")
			.map((item) => this.parseCommand(item))
			.forEach((command) => this.executeLightCommand(command, turnedOnLights));

		return turnedOnLights.size;
	}

	second(input: string): number {
		return -1;
	}

	private executeLightCommand(
		command: ParsedCommand,
		currentState: Point2DSet,
	): void {
		switch (command.command) {
			case LightCommand.turnOn:
				for (let x = command.from.x; x <= command.to.x; x++) {
					for (let y = command.from.y; y <= command.to.y; y++) {
						currentState.add({ x, y });
					}
				}
				break;
			case LightCommand.turnOff:
				for (let x = command.from.x; x <= command.to.x; x++) {
					for (let y = command.from.y; y <= command.to.y; y++) {
						currentState.delete({ x, y });
					}
				}
				break;
			case LightCommand.toggle:
				for (let x = command.from.x; x <= command.to.x; x++) {
					for (let y = command.from.y; y <= command.to.y; y++) {
						const point = { x, y };
						if (currentState.has(point)) {
							currentState.delete(point);
						} else {
							currentState.add(point);
						}
					}
				}
				break;
		}
	}

	private parseCommand(line: string): ParsedCommand {
		const commandString: string | undefined = line.match(
			/^(turn on)|(turn off)|(toggle)/m,
		)?.[0];

		const coordinatesArray: Point2D[] | undefined = line
			.match(/(\d{1,3},\d{1,3})/g)
			?.map((match) => {
				const xy = match.split(",").map((item) => parseInt(item, 10));
				return { x: xy.at(0) ?? -1, y: xy.at(1) ?? -1 } satisfies Point2D;
			});
		const fromCoordinates = coordinatesArray?.at(0);
		const toCoordinates = coordinatesArray?.at(1);

		if (
			commandString === undefined ||
			fromCoordinates === undefined ||
			toCoordinates === undefined
		) {
			throw new Error("Unable to parse either command or from/to coordinates");
		}

		return {
			command: this.stringToCommand(commandString),
			from: fromCoordinates,
			to: toCoordinates,
		} satisfies ParsedCommand;
	}

	private stringToCommand(commandString: string): LightCommand {
		const commandStringToEnumMap: Record<string, LightCommand> = {
			toggle: LightCommand.toggle,
			"turn on": LightCommand.turnOn,
			"turn off": LightCommand.turnOff,
		};
		const command = commandStringToEnumMap[commandString];
		if (command === undefined) {
			throw new Error(`Unknown command: ${commandString}`);
		}

		return command;
	}
}
