import React, { Component } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

import KensanConst from "../KensanConst";
import SetWorkSpaceMenu from "./SetWorkSpaceMenu";
import Set from "./Set";

const SetWorkSpace = ({
	sets,
	onDrop,
	items,
	onTrash,
	onInnerMove,
	onTransfer,
	onSetMove,
	onPlusClick
}) => {
	const [{ isOver }, drop] = useDrop({
		accept: [KensanConst.ItemType.InnerItem, KensanConst.ItemType.Set],
		drop: (item, monitor) => {
			// didDropがtrueの時は他のドロップターゲットにドロップした時
			// つまりWorkSpaceの子供のSetの上にドロップされている
			const droppedPosition = monitor.getSourceClientOffset();
			switch (item.type) {
				case KensanConst.ItemType.InnerItem:
					if (!monitor.didDrop()) {
						onTrash(item.innerItemInfo.setId, item.innerItemInfo.innerItemId);
					}
					break;
				case KensanConst.ItemType.Set:
					onSetMove(item.setInfo.set_id, droppedPosition);
					break;
				default:
					return;
			}
		},
		collect: monitor => ({
			isOver: monitor.isOver({ shallow: true })
		})
	});
	const style = {
		backgroundColor: isOver ? "#FFEFFB" : "white"
	};

	return (
		<div className="setWorkSpace" style={style} ref={drop}>
			<SetWorkSpaceMenu onPlusClick={onPlusClick} />
			{sets.map(set => (
				<Set
					key={set.set_id}
					setInfo={set}
					onDrop={onDrop}
					items={items}
					position={set.position}
					onInnerMove={onInnerMove}
					onTransfer={onTransfer}
				/>
			))}
		</div>
	);
};

SetWorkSpace.propTypes = {
	sets: PropTypes.arrayOf(
		PropTypes.shape({
			set_id: PropTypes.number.isRequired
		})
	).isRequired,
	onDrop: PropTypes.func.isRequired,
	onTrash: PropTypes.func.isRequired,
	onInnerMove: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default SetWorkSpace;
