export interface GameRoundTypeMap {
	"debate": DebateRoundData;
}

export type GameRoundType = keyof GameRoundTypeMap;

export interface Game {
	admin: string;
	players: string[];
	rounds: GameRound<GameRoundType>[];
}

export interface GameRound<T extends GameRoundType> {
	type: T;
	data: GameRoundTypeMap[T];
}

export interface DebateRoundData {
	topics: DebateTopic[];
	currentTopic: number;
}

export interface DebateTopic {
	text: string;
	sides: string[];
	votes: number[];
}
