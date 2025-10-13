import {
	type Point2D,
	Point2DMap,
	Point2DSet,
	type Solution,
} from "../../common";

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
			.forEach((command) => {
				this.executeLightCommand(command, turnedOnLights);
			});

		return turnedOnLights.size;
	}

	second(input: string): number {
		const brightnessMap = new Point2DMap<number>();
		input
			.split("\n")
			.map((item) => this.parseCommand(item))
			.forEach((command) => {
				this.executeBrightnessCommand(command, brightnessMap);
			});

		// Calculate total brightness
		let totalBrightness = 0;
		for (const brightness of brightnessMap.values()) {
			totalBrightness += brightness;
		}

		return totalBrightness;
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

	private executeBrightnessCommand(
		command: ParsedCommand,
		brightnessMap: Point2DMap<number>,
	): void {
		for (let x = command.from.x; x <= command.to.x; x++) {
			for (let y = command.from.y; y <= command.to.y; y++) {
				const point = { x, y };
				const currentBrightness = brightnessMap.get(point) ?? 0;

				switch (command.command) {
					case LightCommand.turnOn:
						brightnessMap.set(point, currentBrightness + 1);
						break;
					case LightCommand.turnOff:
						brightnessMap.set(point, Math.max(0, currentBrightness - 1));
						break;
					case LightCommand.toggle:
						brightnessMap.set(point, currentBrightness + 2);
						break;
				}
			}
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
