import React, { Component } from "react";

import SetWorkSpaceMenu from "./SetWorkSpaceMenu";
import Set from "./Set";

class SetWorkSpace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sets: [
				{
					name: "セットA",
					color: "#F271D8",
					style: {
						top: 80,
						left: 50,
						border: "3px solid #F271D8"
					}
				}
			]
		};
	}

	render() {
		return (
			<div className="setWorkSpace">
				<SetWorkSpaceMenu />
				{this.state.sets.map(set => (
					<Set setInfo={set} />
				))}
			</div>
		);
	}
}

export default SetWorkSpace;
