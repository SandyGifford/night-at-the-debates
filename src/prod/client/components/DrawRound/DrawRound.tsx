import "./DrawRound.style";

import * as React from "react";
import GameRound, { GameRoundProps } from "../Round/Round";

interface DrawRoundState { }

export default class DrawRound extends GameRound<"debate", DrawRoundState> {
	constructor(props: GameRoundProps<"debate">) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="DrawRound"></div>
		)
	}
}