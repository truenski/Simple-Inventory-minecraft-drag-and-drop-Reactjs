import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"

const listItems = [
	{
		id: "1",
		value:4

	},
	{
		id: "2",
		value:17
	},
	{
		id: "3",
		value:265
	},
	{
		id: "4",
		value:266
	},
	{
		id: "5",
		value:331
	}, {
		id: "6",
		value:264
	}, {
		id: "7",
		value:287
	}, {
		id: "8",
		value:288
	}, {
		id: "9",
		value:318
	}, {
		id: "10",
		value:263
	}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
const getItemStyle = (isDragging: boolean, draggableStyle:any) => ({
	
		opacity:isDragging?(0.7):(1),
	 

	transition: `all 0.5s ease-in`,
	...draggableStyle
})


/*
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	padding: 10,
	margin: `0 50px 15px 50px`,
	background: isDragging ? "#4a2975" : "white",
	color: isDragging ? "white" : "black",
	border: `1px solid black`,
	fontSize: `20px`,
	borderRadius: `5px`,

	...draggableStyle
})
  */



function App() {
	const [todo, setTodo] = useState(listItems)

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(todo)
		const [newOrder] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setTodo(items)
	}
	return (
		<div className="App">
			<h1>Inventário</h1>
			<p>Arraste, separe, aumente quantidade.</p>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="todo">
					{(provided) => (
						<div className="todo" id="inventory" {...provided.droppableProps} ref={provided.innerRef}>
							{todo.map((item, index) => {
								return (<div className="gridCell">

									{typeof item === 'object' ? <Draggable key={item?.id} draggableId={item?.id} index={index}>
										{(provided, snapshot) => (
											
												 <img src={`http://www.101computing.net/mc/${item.value}-0.png`} 
												 	ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} />
											
										)}
									</Draggable> : <Draggable key={index} draggableId={String(index)} index={index}>
										{(provided) => (
											
												 <div
												 	ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												 />
											
										)}
									</Draggable>}

									</div>
								)
							})}
						 {provided.placeholder}
							
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}

export default App
