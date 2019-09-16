import React from "react";
import PropTypes from "prop-types";

const Set = ({ setInfo }) => (
	<section className="set" style={setInfo.style}>
		<h2 className="set__name" style={{ backgroundColor: setInfo.color }}>
			{setInfo.name}
		</h2>
		<ul className="set__itemList"></ul>
	</section>
);

Set.propTypes = {
	setInfo: PropTypes.shape({
		name: PropTypes.string
	})
};

export default Set;
