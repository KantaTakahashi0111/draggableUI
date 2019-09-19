import React, { Component } from "react";
import { useDrop } from 'react-dnd';

import KensanConst from "../KensanConst";
import SetWorkSpaceMenu from "./SetWorkSpaceMenu";
import Set from "./Set";

const SetWorkSpace = ({ sets, onDrop, items, onTrash }) => {
	const [{ isOver }, drop] = useDrop({
		accept: KensanConst.ItemType.InnerItem,
		drop: item => {
			console.log(item);
			onTrash(item.innerItemInfo.setId, item.innerItemInfo.innerItemId);
		},
		collect: monitor => ({
			isOver: !!monitor.isOver()
		})
	});
	const style = {
		backgroundColor: isOver ? "#FFEFFB" : "white"
	};

	return (
		<div className="setWorkSpace" style={style} ref={drop}>
			<SetWorkSpaceMenu />
			{sets.map(set => (
				<Set
					setInfo={set}
					onDrop={onDrop}
					items={items}
					position={set.position}
				/>
			))}
		</div>
	);
};

export default SetWorkSpace;
