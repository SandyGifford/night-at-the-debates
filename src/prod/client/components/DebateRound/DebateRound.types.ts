export interface DebateRoundConfig {
	topics: DebateTopic[];
}

export interface DebateTopic {
	text: string;
	sides: string[];
}
