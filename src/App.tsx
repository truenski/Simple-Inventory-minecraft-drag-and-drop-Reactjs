import React from "react"
import "./App.css"
import { BoxesGroup } from "./Components/BoxesGroup"

 

function App() {
	return (
		<div className="App">
			<h1>Inventory</h1>

	<p>Arraste, separe, aumente quantidade.</p>
		<div id="inventory-div">
		<div id="inventory">
			<div className="steve-background"></div>
			
			<BoxesGroup/>
			
		</div>
		</div>
		<small style={{float:'right'}}>by Kesney Mendes Viana</small>
		</div>
	)
}

   

  
	
 

export default App
