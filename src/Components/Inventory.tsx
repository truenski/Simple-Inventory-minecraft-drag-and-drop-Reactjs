import { useState } from "react";

function Box (props){

	return(
<div
		  className="box"
			//style={{ backgroundColor: this.props.box.color }}
		  draggable
		  onDragStart={this.props.onDragStart({ id: this.props.box.id })}
		  onDragOver={this.props.onDragOver({ id: this.props.box.id })}
		  onDrop={this.props.onDrop({ id: this.props.box.id })}
		  >
		  <div className="content">{this.props.box instanceof Object  && <img src={`http://www.101computing.net/mc/${this.props.box.name}-0.png`}/>} </div>
		</div>

	)
  }
  
  function BoxesGroup (){

		const arrBoxes:{id:number,name?:number}[]  = [
		  { id: 1, name: 110},
		  { id: 2, name: 115 },
		  { id: 3, name: 364},
		  { id: 4, name: 243 },
		  { id: 5, name: 225 },
		  { id: 6, name: 4},
		  {id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23},{id:24},{id:25},{id:26},{id:27},{id:28},{id:29},{id:30},{id:31},{id:32},{id:33},{id:34},{id:35},{id:36}
		]
	  
        const [boxes,setBoxes] = useState(arrBoxes)

	  const swapBoxes = (fromBox: { id: number; },toBox: { id: number; }) =>{
		let boxes= boxes.slice();
		let fromIndex = -1;
		let toIndex = -1;
		
		for (let i = 0; i < boxes.length; i++) {
			if (boxes[i].id === fromBox.id) {
			  fromIndex = i;
			}
			if (boxes[i].id === toBox.id) {
			  toIndex = i;
			}
		  }


		  if (fromIndex != -1 && toIndex != -1) {
			let { fromId, ...fromRest } = boxes[fromIndex];
			let { toId, ...toRest } = boxes[toIndex];
			boxes[fromIndex] = { id: fromBox.id, ...toRest };
			boxes[toIndex] = { id: toBox.id, ...fromRest };
	  
			this.setState({ boxes: boxes });
		  }
	  }


	  
  
  /* The dragstart event is fired when the user starts dragging an element or text selection */
  /* event.target is the source element : that is dragged */
  /* Firefox requires calling dataTransfer.setData for the drag to properly work */
 const handleDragStart = data => event => {
	let fromBox = JSON.stringify({ id: data.id });
	event.dataTransfer.setData("dragContent", fromBox);
  };
  
  /* The dragover event is fired when an element or text selection is being dragged */
  /* over a valid drop target (every few hundred milliseconds) */
  /* The event is fired on the drop target(s) */
  const handleDragOver = data => event => {
	event.preventDefault(); // Necessary. Allows us to drop.
	return false;
  };
  
  /* Fired when an element or text selection is dropped on a valid drop target */
  /* The event is fired on the drop target(s) */
  const handleDrop = data => event => {
	event.preventDefault();
  
	let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
	let toBox = { id: data.id };
  
	this.swapBoxes(fromBox, toBox);
	return false;
  };
  
  const makeBoxes = () => {
	return boxes.map(box => (
	  <Box
		box={box}
		key={box.id}
		draggable
		onDragStart={handleDragStart}
		onDragOver={handleDragOver}
		onDrop={handleDrop}
		/>
	));
  };


  return (
	<>
	  <h1>Inventário</h1>
			<p>Arraste, separe, aumente quantidade.</p>
	  <div className="boxesGroup">{makeBoxes()}</div>
		
	</>)
	}