import React from "react"
import "./App.css"
import { BoxesGroup } from "./Components/BoxesGroup"

 

function App() {
	return (
		<div className="App">
			<h1>Inventory</h1>

	<p>Drag, drop, delete, equip, (...)</p>
		<div id="inventory-div">
		<div id="inventory">
		    <p className="crafting-text">Crafting</p>
			<div className="steve-background"></div>
			<div className="result-arrow"></div>
			<BoxesGroup/>
		</div>
		</div>
		<small style={{float:'right'}}>by Kesney Mendes Viana</small>
		</div>
	)
}

   

  
	
 

export default App
