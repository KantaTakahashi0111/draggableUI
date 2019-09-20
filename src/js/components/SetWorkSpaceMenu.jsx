import React, { Component } from "react";

import plusIcon from "../../images/plus-icon.svg";
import copyIcon from "../../images/copy-icon.svg";
import trashIcon from "../../images/trash-icon.svg";

import MenuItem from "./MenuItem";

class SetWorkSpaceMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: {
				top: 15,
				left: 15
			}
		};
		this.menus = [
			{
				iconSrc: plusIcon,
				alt: "追加",
				onClick: () => {}
			},
			{
				iconSrc: copyIcon,
				alt: "複製",
				onClick: () => {}
			},
			{
				iconSrc: trashIcon,
				alt: "削除",
				onClick: () => {}
			}
		];
	}
	render() {
		return (
			<ul className="setWorkSpaceMenu" style={this.state.position}>
				{this.menus.map(menu => (
					<MenuItem
						key={menu.alt}
						alt={menu.alt}
						iconSrc={menu.iconSrc}
						onClick={menu.onClick}
					/>
				))}
			</ul>
		);
	}
}

export default SetWorkSpaceMenu;
