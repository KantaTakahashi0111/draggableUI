import React, { Component } from "react";
import PropTypes from "prop-types";

import KensanConst from "../KensanConst";

class NameTextBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text
		};
	}

	onChange(e) {
		this.setState({ text: e.value });
		this.props.onChange(this.state.text);
	}

	render() {
		return (
			<input className="nameTextBox" type="text" value={this.state.text} />
		);
	}
}

NameTextBox.propTypes = {
	text: PropTypes.string
};

export default NameTextBox;
