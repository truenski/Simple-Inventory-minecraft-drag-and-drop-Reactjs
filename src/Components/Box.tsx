import { DragEventHandler } from "react";

type Props = {
	box:{id?: number | undefined; name?: number | undefined;},
	draggable:boolean,
    onDragStart: (arg0: { id: any; }) => DragEventHandler<HTMLDivElement> | undefined,
	onDragOver: (arg0: { id: any; }) => DragEventHandler<HTMLDivElement> | undefined, 
	onDrop: (arg0: { id: any; }) => DragEventHandler<HTMLDivElement> | undefined,
	onEnter: () => DragEventHandler<HTMLDivElement> | undefined,
	
isDragging:boolean
}

export default function Box ({box,draggable,onDragStart,onDragOver,onDrop,isDragging,onEnter}:Props)
{

	return(
<div
		  className="box"
		  onDragEnter={onEnter}
		  onDragStart={onDragStart({ id: box.id })}
		  onDragOver={onDragOver({ id: box.id })}
		  onDrop={onDrop({ id: box.id })}
		  >
		  <div className="content" onMouseOver={onDragOver({id: box.id})}>{box.name  && <img draggable src={`http://www.101computing.net/mc/${box.name}-0.png`} alt={`${box.name}`}/>} </div>
		</div>

	)
  }