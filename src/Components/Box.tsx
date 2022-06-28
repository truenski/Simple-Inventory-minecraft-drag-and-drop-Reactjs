import { DragEventHandler, useEffect } from "react";

type Props = {
	box: {
		id?: number | undefined;
		itemID?: number | undefined;
		class?: string | undefined;
		quantity?: number | undefined;

	},
	draggable: boolean,
	onDragStart: (arg0: { id: any; }) => DragEventHandler<HTMLDivElement> | undefined,
	onDragOver: (arg0: { id: any; }) => DragEventHandler<HTMLDivElement> | undefined,
	onDrop: (arg0: {
		id?: number | undefined;
		itemID?: number | undefined;
		class?: string | undefined;
	}) => DragEventHandler<HTMLDivElement> | undefined,
	onEnter: () => DragEventHandler<HTMLDivElement> | undefined,

	isDragging: boolean
}

export default function Box({ box, draggable, onDragStart, onDragOver, onDrop, isDragging, onEnter }: Props) {

		
	return (
		<div
			 className={box.class?`box ${box.class}`:"box"}
			style={box.class?.includes("armory") && box.itemID? {backgroundImage:"none"}:undefined}
			onDragEnter={onEnter}
			onDragStart={box.itemID ? onDragStart({ id: box.id }):undefined}
			onDragOver={onDragOver({ id: box.id })}
			onDrop={onDrop(box)}
			draggable={false}
		>{box.itemID && <img className="content" draggable={true} src={"/images/"+box.itemID+"-0.png"} alt={`${box.itemID}`} />
		}
		{box.quantity! > 1 && <div className="quantity">{box.quantity}</div>}
	
		</div>

	)
}