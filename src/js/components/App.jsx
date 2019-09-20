import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import KensanHeader from "./KensanHeader";
import SetWorkSpace from "./SetWorkSpace";
import ItemWorkSpace from "./ItemWorkSpace";
import KensanConst from "../KensanConst";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			a: 1,
			sets: [
				{
					set_id: 1,
					name: "トレーニングA",
					color: "#F19F4D",
					position: {
						x: 50,
						y: 80
					},
					style: {
						border: "3px solid #F19F4D"
					},
					containedItems: []
				},
				{
					set_id: 10,
					name: "トレーニングB",
					color: "#8FE23C",
					position: {
						x: 350,
						y: 80
					},
					style: {
						border: "3px solid #8FE23C"
					},
					containedItems: []
				}
			],
			items: [
				{
					item_id: 1,
					name: "腹筋ローラー",
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
					name: "ベンチプレス",
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

	getContainedItemId(setId, innerItemId) {
		// セットIDから操作があったセットを特定する
		const set = this.getSetbyId(setId);
		return set.containedItems[innerItemId].itemId;
	}

	//セットIDからセットを取得
	getSetbyId(setId) {
		const { sets } = this.state;
		return sets.find(element => element.set_id === setId);
	}

	//SetのPositionがrelativeのときの座標を計算する
	getRelativeSetPosition(absolutePosition) {
		const relativePosition = {
			x: absolutePosition.x,
			y: absolutePosition.y - KensanConst.APP_HEADER_HEIGHT
		};

		return relativePosition;
	}

	// 絶対座標ではウィンドウのリサイズに対応できない
	// 絶対座標から指定されたSETへの相対座標を算出する
	getRelativePosition(setId, absolutePosition) {
		// セットIDから操作があったセットを特定する
		const set = this.getSetbyId(setId);
		// position: relativeで表示する座標に変換する
		const relativePosition = {
			x: absolutePosition.x - set.position.x,
			y: absolutePosition.y - set.position.y - KensanConst.SET_HEADER_HEIGHT
		};
		return relativePosition;
	}

	// 指定されたsetIdの内部アイテムIDに対応する内部アイテムを削除する
	removeItemFromSet(setId, innerItemId) {
		console.log({ setId, innerItemId });
		const targetSet = this.getSetbyId(setId);
		const newInnerItems = targetSet.containedItems.filter(
			(element, index) => index !== innerItemId
		);
		targetSet.containedItems = newInnerItems;
		this.forceUpdate();
	}

	// 指定されたsetIdの指定されたポジションにアイテムを追加する
	addItemToSet(setId, itemId, position) {
		// セットIDから操作があったセットを特定する
		const droppedSet = this.getSetbyId(setId);
		const droppedItemInfo = {
			itemId,
			position: this.getRelativePosition(setId, position)
		};
		droppedSet.containedItems.push(droppedItemInfo);
	}

	handleSetMove(setId, droppedPosition) {
		const movedSet = this.getSetbyId(setId);
		movedSet.position = this.getRelativeSetPosition(droppedPosition);
	}

	// ドロップされたアイテムをセットに追加
	handleItemDrop(setId, itemId, droppedPosition) {
		this.addItemToSet(setId, itemId, droppedPosition);
	}

	//　セット内のアイテムをセット内にドロップしたときの処理
	handleInnerMove(setId, innerItemId, droppedPosition) {
		// セットIDから操作があったセットを特定する
		const droppedSet = this.getSetbyId(setId);
		//　内部アイテムIDから操作があったアイテムを特定する
		const movedItem = droppedSet.containedItems.find(
			(_element, index) => index === innerItemId
		);
		// 内部アイテムの座標をドロップされた位置に変更する
		movedItem.position = this.getRelativePosition(setId, droppedPosition);
	}

	// セット内アイテムを外にドロップしたときの処理
	handleItemTrash(setId, innerItemId) {
		this.removeItemFromSet(setId, innerItemId);
	}

	// セット間のアイテムの移動
	handleItemTransfer(toSetId, innerItemInfo, droppedPosition) {
		const transferedItemId = this.getContainedItemId(
			innerItemInfo.setId,
			innerItemInfo.innerItemId
		);
		//　輸送元から削除
		this.removeItemFromSet(innerItemInfo.setId, innerItemInfo.innerItemId);
		//　輸送先に追加
		this.addItemToSet(toSetId, transferedItemId, droppedPosition);
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
						onTrash={(setId, innerItemId) => {
							this.handleItemTrash(setId, innerItemId);
						}}
						onInnerMove={(setId, innerItemId, droppedPosition) => {
							this.handleInnerMove(setId, innerItemId, droppedPosition);
						}}
						onTransfer={(toSetId, innerItemInfo, droppedPosition) => {
							this.handleItemTransfer(toSetId, innerItemInfo, droppedPosition);
						}}
						onSetMove={(setId, droppedPosition) => {
							this.handleSetMove(setId, droppedPosition);
						}}
					/>
					<ItemWorkSpace items={items} />
				</div>
			</DndProvider>
		);
	}
}

export default App;
