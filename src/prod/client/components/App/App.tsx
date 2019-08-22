import "./App.style";

import * as React from "react";
import { GameRoundType, GameRoundTypeConfig } from "@typings/game";
import init from "@client/init";
import { GameRoundProps } from "../Round/Round";

export interface AppProps { }
export interface AppState {
	round: number;
}

interface GameRoundConfig<ROUND_TYPE extends GameRoundType> {
	type: ROUND_TYPE;
	config: GameRoundTypeConfig<ROUND_TYPE>;
}

const config: GameRoundConfig<GameRoundType>[] = [
	{
		type: "debate",
		config: {
			topics: [
				{ text: "Debate something", sides: ["yes", "no"] }
			],
		}
	}
];

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			round: 0,
		};
	}

	public render(): React.ReactNode {
		const { round } = this.state;

		const roundConfig = config[round];
		const roundProps: GameRoundProps<GameRoundType> = {
			config: roundConfig.config
		};

		const roundEl = React.createElement(init.rounds[roundConfig.type].comp, roundProps);

		return (
			<div className="App">
				{roundEl}
			</div>
		)
	}
}