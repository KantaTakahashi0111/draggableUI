import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";

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
			isOver: !!monitor.isOver(),
		})
	});
	// console.log(droppedPosition);

	const extraStyle = {
		backgroundColor: isOver ? "red" : "white",
		top: position.y,
		left: position.x
	};

	// console.log(dropObj);
	const newStyle = Object.assign(extraStyle, setInfo.style);

	return (
		<section className="set" style={newStyle} ref={drop}>
			<h2 className="set__name" style={{ backgroundColor: setInfo.color }}>
				{setInfo.name}
			</h2>
			<ul className="set__itemList">
				{setInfo.containedItems.map(containedItem => (
					<Item
						itemInfo={items.find(
							element => element.item_id === containedItem.itemId
						)}
						position={containedItem.position}
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
