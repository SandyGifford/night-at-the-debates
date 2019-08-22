import "./DebateRound.style";

import * as React from "react";
import GameRound, { GameRoundProps } from "../Round/Round";

interface DebateRoundState { }

export default class DebateRound extends GameRound<"debate", DebateRoundState> {
	constructor(props: GameRoundProps<"debate">) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="DebateRound">{this.props.config.topics[0].text}</div>
		)
	}
}