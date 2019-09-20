import React, { Component } from "react";

import ItemWorkSpaceMenu from "./ItemWorkSpaceMenu";
import Item from "./Item";

import KensanConst from '../KensanConst';

class ItemWorkSpace extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { items, onItemNameChange, onItemPlusClick } = this.props;

		return (
			<div className="itemWorkSpace">
				<ItemWorkSpaceMenu onPlusClick={onItemPlusClick} />
				<div className="itemContainer">
					{items.map(item => (
						<Item
							key={item.item_id}
							itemInfo={item}
							position={item.position}
							type={KensanConst.ItemType.Item}
							onItemNameChange={onItemNameChange}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default ItemWorkSpace;
