import { ANSIStyle, ANSIToken } from "../typings/ansi";

export default class AnsiUtils {
	private static readonly MUTATIONS: { [key: string]: Partial<ANSIStyle> } & { "0": ANSIStyle } = {
		"0": { //  Reset / Normal
			fgColor: "black",
			bgColor: "none",
			blink: "none",
			intensity: "normal",
			inverse: false,
			overline: false,
			underline: false,
			conceal: false,
			encircled: false,
			font: 0,
			framed: false,
			italic: false,
			strikethrough: false,
		},
		"1": { intensity: "bright" }, //  Strong intensity
		"2": { intensity: "faint" }, //  Faint intensity
		"3": { italic: true }, //  Italic
		"4": { underline: true }, //  Underline
		"5": { blink: "slow" }, //  Slow Blink
		"6": { blink: "fast" }, //  Rapid Blink
		"7": { inverse: true }, // Swap foreground and background colors
		"8": { conceal: true }, //  Conceal
		"9": { strikethrough: true }, //  Strikethrough
		"10": { font: 0 }, //  Default font
		"11": { font: 1 }, //  Alternate font
		"12": { font: 2 }, //  Alternate font
		"13": { font: 3 }, //  Alternate font
		"14": { font: 4 }, //  Alternate font
		"15": { font: 5 }, //  Alternate font
		"16": { font: 6 }, //  Alternate font
		"17": { font: 7 }, //  Alternate font
		"18": { font: 8 }, //  Alternate font
		"19": { font: 9 }, //  Alternate font
		"21": { intensity: "normal" }, //  Normal intensity
		"22": { fgColor: "none" }, //  Normal FG color
		"23": { italic: false }, //  Italic off
		"24": { underline: false }, //  Underline off
		"25": { blink: "none" }, //  Blink off
		"27": { inverse: false }, //  Inverse off
		"28": { conceal: false }, //  Conceal off
		"29": { strikethrough: false }, //  Strikethrough off
		"30": { fgColor: "black" }, //  Set FG color
		"31": { fgColor: "red" }, //  Set FG color
		"32": { fgColor: "green" }, //  Set FG color
		"33": { fgColor: "yellow" }, //  Set FG color
		"34": { fgColor: "blue" }, //  Set FG color
		"35": { fgColor: "magenta" }, //  Set FG color
		"36": { fgColor: "cyan" }, //  Set FG color
		"37": { fgColor: "white" }, //  Set FG color
		"39": { fgColor: "none" }, //  Default FG color
		"40": { bgColor: "black" }, //  Set BG color
		"41": { bgColor: "red" }, //  Set BG color
		"42": { bgColor: "green" }, //  Set BG color
		"43": { bgColor: "yellow" }, //  Set BG color
		"44": { bgColor: "blue" }, //  Set BG color
		"45": { bgColor: "magenta" }, //  Set BG color
		"46": { bgColor: "cyan" }, //  Set BG color
		"47": { bgColor: "white" }, //  Set BG color
		"49": { bgColor: "none" }, //  Default BG color
		"51": { framed: true }, //  Framed
		"52": { encircled: true }, //  Encircled
		"53": { overline: true }, //  Overlined
		"54": { framed: false, encircled: false }, //  Framed and encircled off
		"55": { overline: false }, //  Not overlined
		"90": { fgColor: "black", intensity: "bright" }, //  Set bright FG color
		"91": { fgColor: "red", intensity: "bright" }, //  Set bright FG color
		"92": { fgColor: "green", intensity: "bright" }, //  Set bright FG color
		"93": { fgColor: "yellow", intensity: "bright" }, //  Set bright FG color
		"94": { fgColor: "blue", intensity: "bright" }, //  Set bright FG color
		"95": { fgColor: "magenta", intensity: "bright" }, //  Set bright FG color
		"96": { fgColor: "cyan", intensity: "bright" }, //  Set bright FG color
		"97": { fgColor: "white", intensity: "bright" }, //  Set bright FG color
		"100": { bgColor: "black", intensity: "bright" }, //  Set bright BG color
		"101": { bgColor: "red", intensity: "bright" }, //  Set bright BG color
		"102": { bgColor: "green", intensity: "bright" }, //  Set bright BG color
		"103": { bgColor: "yellow", intensity: "bright" }, //  Set bright BG color
		"104": { bgColor: "blue", intensity: "bright" }, //  Set bright BG color
		"105": { bgColor: "magenta", intensity: "bright" }, //  Set bright BG color
		"106": { bgColor: "cyan", intensity: "bright" }, //  Set bright BG color
		"107": { bgColor: "white", intensity: "bright" }, //  Set bright BG color
	};

	public static tokenize(str: string, removeEmpty = true): ANSIToken[][] {
		let style = this.MUTATIONS[0];

		const tokens: ANSIToken[][] = str.split("\n")
			.map(lineStr => {
				const line: ANSIToken[] = lineStr.match(/\033\[[\d;]+m.*?(?=(?:\033|$))/gm)
					.map(groupStr => {
						const [, styleStr, text] = groupStr.match(/\033\[([\d;]+)m(.*)/);
						const styles = styleStr.split(";");

						styles.forEach(styleSequence => {
							style = this.getMutatedStyle(style, styleSequence);
						});

						return {
							text,
							style
						};
					});

				if (removeEmpty) return line.filter(l => !!l.text);
				else return line;
			});

		return tokens;
	}

	public static getMutatedStyle(style: ANSIStyle, sequence: string): ANSIStyle {
		return {
			...style,
			...this.MUTATIONS[sequence],
		};
	}
}