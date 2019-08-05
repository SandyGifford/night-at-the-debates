import "./DevApp.style";
import io from "socket.io-client";
import * as React from "react";
import AnsiText from "@devComponents/AnsiText/AnsiText";

export interface DevAppProps { }
export interface DevAppState {
	errors: string[];
	buildCount: number;
}

export default class DevApp extends React.PureComponent<DevAppProps, DevAppState> {
	private socket = io();

	constructor(props: DevAppProps) {
		super(props);
		this.state = {
			errors: [],
			buildCount: 0,
		};
	}

	public componentDidMount() {
		this.socket.on("buildSuccess", this.buildSuccess);
		this.socket.on("buildFail", this.buildFail);
	}

	public componentWillUnmount() {
		this.socket.off("buildSuccess", this.buildSuccess);
		this.socket.off("buildFail", this.buildFail);
	}

	public render(): React.ReactNode {
		const { errors, buildCount } = this.state;

		return (
			<div className="DevApp">
				<iframe className="DevApp__app" src={`/prod?b=${buildCount}`} />
				{
					errors.length ?
						<div className="DevApp__errors">{
							errors.map((error, e) => <AnsiText ansiStr={error} key={e} />)
						}</div> :
						null
				}
			</div>
		)
	}

	private buildSuccess = () => {
		this.setState({
			errors: [],
		});

		this.incrementBuild();
	};

	private buildFail = (errors: string[]) => {
		this.setState({
			errors,
		});

		this.incrementBuild();
	};

	private incrementBuild = () => {
		this.setState({
			buildCount: this.state.buildCount + 1
		});
	};
}