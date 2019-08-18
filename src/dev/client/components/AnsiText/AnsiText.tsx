import "./AnsiText.style";

import * as React from "react";
import { ANSIToken, ANSIColor, ANSIIntensity } from "../../../shared/typings/ansi";
import AnsiUtils from "../../../shared/utils/AnsiUtils";

export interface AnsiTextProps {
	ansiStr: string;
}
export interface AnsiTextState {
	lines: ANSIToken[][];
}

export default class AnsiText extends React.PureComponent<AnsiTextProps, AnsiTextState> {
	private static readonly COLORS: Omit<{ [color in ANSIColor]: { normal?: string, bright?: string, faint?: string } }, "none"> = {
		black: { bright: "rgb(85,85,85)" },
		blue: { normal: "rgb(0,0,170)", bright: "rgb(85,85,255)" },
		cyan: { normal: "rgb(0,170,170)", bright: "rgb(85,255,255)" },
		green: { normal: "rgb(0,170,0)", bright: "rgb(5,255,85)" },
		magenta: { normal: "rgb(170,0,170)", bright: "rgb(255,85,255)" },
		red: { normal: "rgb(170,0,0)", bright: "rgb(255,85,85)" },
		white: { normal: "rgb(170,170,170)", bright: "rgb(255,255,255)" },
		yellow: { normal: "rgb(170,85,0)", bright: "rgb(255,255,85)" },
	};

	constructor(props: AnsiTextProps) {
		super(props);
		this.state = {
			lines: [],
		};
	}

	public render(): React.ReactNode {
		const { lines } = this.state;

		return (
			<div className="AnsiText">{
				lines.map((line, l) => <div className="AnsiText__line" key={l}>{
					line.map((token, t) => {
						const { style, text } = token;

						const domStyle: React.CSSProperties = {
							color: this.getColor(style.fgColor, style.intensity),
							background: this.getColor(style.bgColor, style.intensity),
							fontWeight: style.intensity === "bright" ? "bold" : "normal",
							textDecoration: style.underline ? "underline" : "none",
						};

						return <div className="AnsiText__line__token" style={domStyle} key={t}>{text}</div>
					})
				}</div>)
			}</div>
		)
	}

	public componentDidMount() {
		this.tokenize();
	}

	public componentDidUpdate(prevProps: AnsiTextProps) {
		if (this.props.ansiStr !== prevProps.ansiStr) this.tokenize();
	}

	private tokenize() {
		this.setState({
			lines: AnsiUtils.tokenize(this.props.ansiStr),
		});
	}

	private getColor(colorStr: ANSIColor, intensity: ANSIIntensity): string {
		if (colorStr === "none") return "inherit";

		const colorData = AnsiText.COLORS[colorStr];
		let { normal, bright, faint } = colorData;

		normal = normal || colorStr;
		bright = bright || normal;
		faint = faint || normal;

		switch (intensity) {
			case "normal": return normal;
			case "bright": return bright;
			case "faint": return faint;
		}
	}
}