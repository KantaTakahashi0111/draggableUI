import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import KensanConst from "../KensanConst";

const Item = ({ itemInfo, position }) => {
	const [{ isDragging, droppedPosition }, drag] = useDrag({
		item: {
			type: KensanConst.ItemType.Item,
			info: itemInfo
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
			droppedPosition: monitor.getSourceClientOffset()
		})
	});

	// console.log(droppedPosition);
	const extraStyle = {
		opacity: isDragging ? 0.5 : 1,
		top: position.y,
		left: position.x
	};
	const newStyle = Object.assign(extraStyle, itemInfo.style);

	return (
		<section
			className="item"
			style={newStyle}
			ref={drag}
		>
			<h2 className="item__name">{itemInfo.name}</h2>
		</section>
	);
};

Item.propTypes = {
	itemInfo: PropTypes.shape({
		name: PropTypes.string
	})
};

export default Item;
