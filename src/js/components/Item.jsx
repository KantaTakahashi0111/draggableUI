import React from "react";
import PropTypes from "prop-types";

const Item = ({ itemInfo }) => (
	<section className="item" style={itemInfo.style}>
		<h2 className="item__name">{itemInfo.name}</h2>
	</section>
);

Item.propTypes = {
	itemInfo: PropTypes.shape({
		name: PropTypes.string
	})
};

export default Item;
