import { DebateRoundConfig } from "@client/components/DebateRound/DebateRound.types";
import { DrawRoundConfig } from "@client/components/DrawRound/DrawRound.types";

export type GameRoundType = "debate" | "draw";
export type GameRoundTypeMap<T> = { [type in GameRoundType]: T }

export interface GameRoundDataMapping<CONFIG> {
	config: CONFIG;
}

export type GameRoundTypeConfig<ROUND_TYPE extends GameRoundType> = GameRoundDataMap[ROUND_TYPE]["config"];

export interface GameRoundDataMap extends GameRoundTypeMap<GameRoundDataMapping<any>> {
	debate: {
		config: DebateRoundConfig;
	},
	draw: {
		config: DrawRoundConfig;
	}
}
