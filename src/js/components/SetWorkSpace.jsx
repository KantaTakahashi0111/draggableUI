import React, { Component } from "react";

import SetWorkSpaceMenu from "./SetWorkSpaceMenu";
import Set from "./Set";

class SetWorkSpace extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { sets, onDrop, items } = this.props;

		return (
			<div className="setWorkSpace">
				<SetWorkSpaceMenu />
				{sets.map(set => (
					<Set
						setInfo={set}
						onDrop={onDrop}
						items={items}
						position={set.position}
					/>
				))}
			</div>
		);
	}
}

export default SetWorkSpace;
