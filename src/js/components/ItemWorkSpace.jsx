import React, { Component } from "react";

import ItemWorkSpaceMenu from "./ItemWorkSpaceMenu";
import Item from "./Item";

class ItemWorkSpace extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { items } = this.props;

		return (
			<div className="itemWorkSpace">
				<ItemWorkSpaceMenu />
				<div className="itemContainer">
					{items.map(item => (
						<Item itemInfo={item} position={item.position} />
					))}
				</div>
			</div>
		);
	}
}

export default ItemWorkSpace;
