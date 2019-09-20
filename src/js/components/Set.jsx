import React from "react";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";

import KensanConst from "../KensanConst";
import Item from "./Item";

const Set = ({ setInfo, onDrop, items, position, onInnerMove, onTransfer }) => {
	const [{ isOver }, drop] = useDrop({
		accept: [KensanConst.ItemType.Item, KensanConst.ItemType.InnerItem],
		drop: (item, monitor) => {
			const droppedPosition = monitor.getSourceClientOffset();
			if (item.type === KensanConst.ItemType.Item) {
				onDrop(setInfo.set_id, item.info.item_id, droppedPosition);
			} else {
				if (item.innerItemInfo.setId === setInfo.set_id) {
					onInnerMove(
						item.innerItemInfo.setId,
						item.innerItemInfo.innerItemId,
						droppedPosition
					);
					return;
				}
				// 落とされたinnerItemの所属IDが自分でなければ輸送とみなす
				onTransfer(setInfo.set_id, item.innerItemInfo, droppedPosition);
			}
		},
		collect: monitor => ({
			isOver: !!monitor.isOver()
		})
	});

	const [{ isDragging }, drag] = useDrag({
		item: { type: KensanConst.ItemType.Set, setInfo },
		collect: monitor => ({
			isDragging: !!monitor.isDragging()
		})
	});

	// props, constructorから割り出される値を元に追加のスタイルを定義
	const extraStyle = {
		backgroundColor: isOver ? "#FFEFFB" : "white",
		top: position.y,
		left: position.x,
		opacity: isDragging ? 0.5 : 1
	};

	const newStyle = Object.assign(extraStyle, setInfo.style);

	return (
		<section className="set" style={newStyle} ref={drag}>
			<h2 className="set__name" style={{ backgroundColor: setInfo.color }}>
				{setInfo.name}
			</h2>
			<ul className="set__itemList" ref={drop}>
				{setInfo.containedItems.map((containedItem, index) => (
					<Item
						key={index}
						innerItemInfo={{
							innerItemId: index,
							setId: setInfo.set_id
						}}
						itemInfo={items.find(
							element => element.item_id === containedItem.itemId
						)}
						position={containedItem.position}
						type={KensanConst.ItemType.InnerItem}
					/>
				))}
			</ul>
		</section>
	);
};

Set.propTypes = {
	setInfo: PropTypes.shape({
		name: PropTypes.string
	}),
	position: PropTypes.shape(),
	items: PropTypes.arrayOf(PropTypes.shape())
};

export default Set;
