import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import KensanHeader from "./KensanHeader";
import SetWorkSpace from "./SetWorkSpace";
import ItemWorkSpace from "./ItemWorkSpace";
import KensanConst from '../KensanConst';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sets: [
				{
					set_id: 1,
					name: "セットA",
					color: "#F271D8",
					position: {
						x: 50,
						y: 80
					},
					style: {
						border: "3px solid #F271D8"
					},
					containedItems: []
				}
			],
			items: [
				{
					item_id: 1,
					name: "アイテム１",
					color: "#F271D8",
					position: {
						x: 20,
						y: 20
					},
					style: {
						backgroundColor: "#F271D8"
					}
				},
				{
					item_id: 10,
					name: "アイテム２",
					color: "#4DC4F1",
					position: {
						x: 200,
						y: 20
					},
					style: {
						backgroundColor: "#4DC4F1"
					}
				}
			]
		};
	}

	// ドロップされたアイテムをセットに追加
	handleItemDrop(setId, itemId, droppedPosition) {
		const { sets } = this.state;
		const droppedSet = sets.find(element => element.set_id === setId);

		// position: relativeで表示する座標に変換する
		const relativePosition = {
			x: droppedPosition.x - droppedSet.position.x,
			y: droppedPosition.y - droppedSet.position.y - KensanConst.SET_HEADER_HEIGHT,
		};

		// セット内の座標とitemIdをセットで追加する
		const droppedItemInfo = {
			itemId,
			position: relativePosition
		};
		droppedSet.containedItems.push(droppedItemInfo);
	}

	render() {
		const { sets, items } = this.state;

		return (
			<DndProvider backend={HTML5Backend}>
				<div className="kensanApp">
					<KensanHeader />
					<SetWorkSpace
						sets={sets}
						items={items}
						onDrop={(setId, itemId, droppedPosition) => {
							this.handleItemDrop(setId, itemId, droppedPosition);
						}}
					/>
					<ItemWorkSpace items={items} />
				</div>
			</DndProvider>
		);
	}
}

export default App;
