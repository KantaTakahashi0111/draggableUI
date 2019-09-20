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
			sets: [],
			items: []
		};
	}

	changeItemName(itemId, newName) {
		const targetItem = this.getItembyId(itemId);
		targetItem.name = newName;
		console.log(newName);
	}

	changeSetName(sedId, newName) {
		const targetSet = this.getSetbyId(sedId);
		targetSet.name = newName;
		console.log(newName);
	}

	createSet(position, name = "", color = "red") {
		const { sets } = this.state;

		const newSet = {
			set_id: sets.length,
			name,
			position,
			color,
			style: {
				border: `3px solid ${color}`
			},
			containedItems: []
		};

		const addedSets = sets.concat(newSet);

		this.setState({ sets: addedSets });
	}

	createItem(position, name = "", color = "red") {
		const { items } = this.state;
		const newItem = {
			item_id: items.length,
			name,
			color,
			position,
			style: {
				backgroundColor: color
			}
		};

		const addedItems = items.concat(newItem);

		this.setState({ items: addedItems });
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

	//アイテムIDからアイテムを取得
	getItembyId(itemId) {
		const { items } = this.state;
		return items.find(element => element.item_id === itemId);
	}

	//SetのPositionがrelativeのときの座標を計算する
	getRelativeSetPosition(absolutePosition) {
		// 絶対座標にスクロール分のY座標を足す
		const scrollY = window.scrollY;

		const relativePosition = {
			x: absolutePosition.x,
			y: absolutePosition.y - KensanConst.APP_HEADER_HEIGHT + scrollY
		};

		return relativePosition;
	}

	// 絶対座標ではウィンドウのリサイズに対応できない
	// 絶対座標から指定されたSETへの相対座標を算出する
	getRelativePosition(setId, absolutePosition) {
		// 絶対座標にスクロール分のY座標を足す
		const scrollY = window.scrollY;
		// セットIDから操作があったセットを特定する
		const set = this.getSetbyId(setId);
		// position: relativeで表示する座標に変換する
		const relativePosition = {
			x: absolutePosition.x - set.position.x,
			y:
				absolutePosition.y -
				set.position.y -
				KensanConst.SET_HEADER_HEIGHT +
				scrollY
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

	// セットメニューのプラスがクリックされたときの処理
	handleSetPlusClick() {
		const position = {
			x:
				this.state.sets.length * KensanConst.SET_GRID_X +
				KensanConst.WORKSPACE_PADDING_LEFT,
			y: KensanConst.SET_Y
		};
		const name = `トレーニング${this.state.sets.length + 1}`;
		const color =
			KensanConst.SET_COLORS[
				this.state.sets.length % KensanConst.SET_COLORS.length
			];

		this.createSet(position, name, color);
	}

	//　アイテムメニューのプラスがクリックされたときの処理
	handleItemPlusClick() {
		const position = {
			x:
				this.state.items.length * KensanConst.ITEM_GRID_X +
				KensanConst.ITEM_WORKSPACE_PADDING_LEFT,
			y: KensanConst.ITEM_Y
		};
		const name =
			KensanConst.ITEM_NAMES[
				this.state.items.length % KensanConst.ITEM_NAMES.length
			];

		const color =
			KensanConst.ITEM_COLORS[
				this.state.items.length % KensanConst.ITEM_COLORS.length
			];
		console.log("plus");
		this.createItem(position, name, color);
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
						onPlusClick={() => {
							this.handleSetPlusClick();
						}}
						onItemNameChange={(itemId, newName) => {
							this.ItemNameChange(itemId, newName);
						}}
					/>
					<ItemWorkSpace
						items={items}
						onItemPlusClick={() => {
							this.handleItemPlusClick();
						}}
					/>
				</div>
			</DndProvider>
		);
	}
}

export default App;
