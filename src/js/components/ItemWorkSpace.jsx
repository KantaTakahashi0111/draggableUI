import React, { Component } from "react";

import ItemWorkSpaceMenu from "./ItemWorkSpaceMenu";
import Item from "./Item";

class ItemWorkSpace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [
				{
					name: "アイテム１",
					color: "#F271D8",
					style: {
						backgroundColor: "#F271D8",
						top: 20,
						left: 20
					}
				}
			]
		};
	}

	render() {
		return (
			<div className="itemWorkSpace">
				<ItemWorkSpaceMenu />
				<div className="itemContainer">
					{this.state.items.map(item => (
						<Item itemInfo={item} />
					))}
				</div>
			</div>
		);
	}
}

export default ItemWorkSpace;
