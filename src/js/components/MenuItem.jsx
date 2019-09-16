import React from "react";
import PropTypes from "prop-types";

const MenuItem = ({ iconSrc, alt, onClick }) => (
	<li className="menuItem">
		<button type="button" className="menuItem__button" onClick={onClick}>
			<img src={iconSrc} alt={alt} className="worSpaceMenu__icon" />
		</button>
	</li>
);

MenuItem.propTypes = {
	iconSrc: PropTypes.string,
	alt: PropTypes.string,
	onCLick: PropTypes.func
};

export default MenuItem;
