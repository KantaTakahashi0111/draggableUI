import React from "react";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";

import KensanConst from "../KensanConst";
import Item from "./Item";

const Set = ({ setInfo, onDrop, items, position }) => {
	const [{ isOver }, drop] = useDrop({
		accept: KensanConst.ItemType.Item,
		drop: (item, monitor) => {
			const droppedPosition = monitor.getSourceClientOffset();
			onDrop(setInfo.set_id, item.info.item_id, droppedPosition);
		},
		collect: monitor => ({
			isOver: !!monitor.isOver()
		})
	});

	const [{ isDragging }, drag] = useDrag({
		item: { type: KensanConst.ItemType.Set, info: setInfo },
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
		<section className="set" style={newStyle} ref={drop}>
			<h2 className="set__name" style={{ backgroundColor: setInfo.color }}>
				{setInfo.name}
			</h2>
			<ul className="set__itemList">
				{setInfo.containedItems.map((containedItem, index) => (
					<Item
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
	})
};

export default Set;
