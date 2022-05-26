import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"

const listItems = [
	{
		id: "1",
		name: <img src="http://www.101computing.net/mc/4-0.png" />,
		value:4

	},
	{
		id: "2",
		name: <img src="http://www.101computing.net/mc/17-0.png" />,
		value:17
	},
	{
		id: "3",
		name: <img src="http://www.101computing.net/mc/265-0.png" />,
		value:265
	},
	{
		id: "4",
		name: <img src="http://www.101computing.net/mc/266-0.png" />,
		value:266
	},
	{
		id: "5",
		name: <img src="http://www.101computing.net/mc/331-0.png" />,
		value:331
	}, {
		id: "6",
		name: <img src="http://www.101computing.net/mc/264-0.png" />,
		value:264
	}, {
		id: "7",
		name: <img src="http://www.101computing.net/mc/287-0.png" />,
		value:287
	}, {
		id: "8",
		name: <img src="http://www.101computing.net/mc/288-0.png" />,
		value:288
	}, {
		id: "9",
		name: <img src="http://www.101computing.net/mc/318-0.png" />,
		value:318
	}, {
		id: "10",
		name: <img src="http://www.101computing.net/mc/263-0.png" />,
		value:263
	}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
const getItemStyle = (isDragging: boolean, draggableStyle:any) => ({
	
		
	 
	
	//transform: `translate(36px, 50px)`,
	//transition: `all 2s ease-in`,
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
								return (
									typeof item === 'object' ? <Draggable key={item?.id} draggableId={item?.id} index={index}>
										{(provided, snapshot) => (
											<div className="gridCell"
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
											>
												 <img src="http://www.101computing.net/mc/4-0.png" />
											</div>
										)}
									</Draggable> : <div className="gridCell"></div>
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
