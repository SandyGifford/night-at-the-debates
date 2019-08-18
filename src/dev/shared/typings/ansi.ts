export type ANSIColor = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "none";
export type ANSIBlink = "fast" | "slow" | "none";
export type ANSIIntensity = "bright" | "faint" | "normal";
export type ANSIFont = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ANSIStyle {
	fgColor: ANSIColor;
	bgColor: ANSIColor;
	intensity: ANSIIntensity;
	blink: ANSIBlink;
	italic: boolean;
	underline: boolean;
	inverse: boolean;
	overline: boolean;
	conceal: boolean;
	strikethrough: boolean;
	font: ANSIFont;
	framed: boolean;
	encircled: boolean;
}

export interface ANSIToken {
	text: string;
	style: ANSIStyle;
}
