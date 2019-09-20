import React, { Component } from "react";

import plusIcon from "../../images/plus-icon.svg";
import copyIcon from "../../images/copy-icon.svg";
import trashIcon from "../../images/trash-icon.svg";

import MenuItem from "./MenuItem";

const SetWorkSpaceMenu = ({ onPlusClick }) => {
	const style = {
		top: 15,
		left: 15
	};

	const menus = [
		{
			iconSrc: plusIcon,
			alt: "追加",
			onClick: onPlusClick
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

	return (
		<ul className="setWorkSpaceMenu" style={style}>
			{menus.map(menu => (
				<MenuItem
					key={menu.alt}
					alt={menu.alt}
					iconSrc={menu.iconSrc}
					onClick={menu.onClick}
				/>
			))}
		</ul>
	);
};

export default SetWorkSpaceMenu;
