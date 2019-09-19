import React, { Component } from "react";

import ItemWorkSpaceMenu from "./ItemWorkSpaceMenu";
import Item from "./Item";

import KensanConst from '../KensanConst';

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
						<Item
							itemInfo={item}
							position={item.position}
							type={KensanConst.ItemType.Item}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default ItemWorkSpace;
