import * as React from "react";
import { GameRoundType, GameRoundTypeConfig } from "@typings/game";

export type GameRoundComp<ROUND_TYPE extends GameRoundType> = { new(props: GameRoundProps<ROUND_TYPE>): GameRound<ROUND_TYPE, any> };
export interface GameRoundProps<ROUND_TYPE extends GameRoundType> {
	config: GameRoundTypeConfig<ROUND_TYPE>;
}

export default abstract class GameRound<ROUND_TYPE extends GameRoundType, STATE> extends React.PureComponent<GameRoundProps<ROUND_TYPE>, STATE> { }