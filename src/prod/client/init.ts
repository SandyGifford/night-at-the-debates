import { GameRoundType } from "@typings/game";
import DebateRound from "./components/DebateRound/DebateRound";
import { GameRoundComp } from "./components/Round/Round";
import DrawRound from "./components/DrawRound/DrawRound";

interface GameRoundInit<T extends GameRoundType> {
	comp: GameRoundComp<T>;
}

const init: { rounds: { [type in GameRoundType]: GameRoundInit<GameRoundType> } } = {
	rounds: {
		debate: {
			comp: DebateRound,
		},
		draw: {
			comp: DrawRound,
		}
	},
};

export default init;