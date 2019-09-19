import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import KensanConst from "../KensanConst";

const Item = ({ itemInfo, position, type, innerItemInfo }) => {
	const [{ isDragging }, drag] = useDrag({
		item: {
			type,
			info: itemInfo,
			innerItemInfo
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		})
	});

	const extraStyle = {
		opacity: isDragging ? 0.5 : 1,
		top: position.y,
		left: position.x
	};
	const newStyle = Object.assign(extraStyle, itemInfo.style);

	return (
		<section className="item" style={newStyle} ref={drag}>
			<h2 className="item__name">{itemInfo.name}</h2>
		</section>
	);
};

Item.propTypes = {
	itemInfo: PropTypes.shape({
		name: PropTypes.string
	})
};

Item.defaultProps = {
	innerItemInfo: {
		innerItemId: -1,
		setId: -1
	}
};

export default Item;
