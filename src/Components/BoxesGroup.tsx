import { useEffect, useState } from "react";
import Box from "./Box";

export function BoxesGroup() {

	type group = { id?: number, name?: number, select?:boolean }[]
	const arrInventory: group = [
		{ id: 1, name: 110 }, { id: 2, name: 115 }, { id: 3, name: 364 }, { id: 4, name: 243 }, { id: 5, name: 225 }, { id: 6, name: 4 }, { id: 7 }, { id: 8 }, { id: 9 },
		{ id: 10}, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 },
		{ id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 },
		{ id: 28, select:true, name :118 }, { id: 29, select:true }, { id: 30, select:true }, { id: 31,select:true }, { id: 32, select:true }, { id: 33, select:true }, { id: 34, select:true }, { id: 35, select:true }, { id: 36, select:true }

	]


	const arrArmory: group = [
		 { id: 37}, { id: 38 }, { id: 39 }, { id: 40 }
	]

	const arrCraft:  group = [
		{ id: 41 }, { id: 42 }, { id: 43 }, { id: 44 }
   ]

   const arrCrafted:  group = [
	{ id: 45 }
]

	const [inventoryBoxes, setInventoryBoxes] = useState(arrInventory)
	
	const [isDragging, setIsDragging] = useState<boolean>(false)

	
	const swapBoxes = (fromBox: any, toBox: any) => {
    
		let fromIndex = -1;
		let toIndex = -1;

		//Index from e to
		for (let i = 0; i < inventoryBoxes.length; i++) {
			if (inventoryBoxes[i].id === fromBox.id) {
				fromIndex = i;
			}
			if (inventoryBoxes[i].id === toBox.id) {
				toIndex = i;
			}
		}

		//se os index foram atribuidos
		//pega o name e select no index
		//Troca os elementos de inventory box
		
		if (fromIndex !== -1 && toIndex !== -1) {
			let { fromId, ...fromRest }: { fromId?: number } & { name?: number, select?:boolean } = inventoryBoxes[fromIndex];
			let { toId, ...toRest }: { toId?: number } & { name?: number, select?:boolean } = inventoryBoxes[toIndex];
			inventoryBoxes[fromIndex] = { id: fromBox.id, name:toRest.name, select:fromRest.select };
			inventoryBoxes[toIndex] = { id: toBox.id, name:fromRest.name, select:toRest.select };

		}
		
	}


	const handleDragStart = (data: { id: any; }) => (event: {
		target: any;
		stopPropagation: any;
		dataTransfer: {
			effectAllowed: string; setData: (arg0: string, arg1: string) => void;
		};
	}) => {
		
		event.target = event.target.firstElementChild;
		let fromBox = JSON.stringify({ id: data.id });
		event.stopPropagation();

		//event.dataTransfer.effectAllowed = "pointer";
		event.dataTransfer.setData("dragContent", fromBox);
		setIsDragging(true);
	};


	const handleDragOver = () => (event: any) => {
		event.preventDefault(); 
		return false;
	};

	const handleDragEnter = () => (event: any) => {
		event.preventDefault(); 
	//	event.dataTransfer.dropEffect = "pointer";

	};

	const handleDrop = (data: { id: any; }) => (event: {
		preventDefault: () => void; dataTransfer: {
			getData: (arg0: string) => string;
		};
	}) => {
		event.preventDefault();
		setIsDragging(false);
		let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
		let toBox = { id: data.id };


		swapBoxes(fromBox, toBox)
		return false;
	};

	
	const makeInventoryBoxes = () => {
		
    
		return (inventoryBoxes.map(box => (
			<Box
				box={box}
				key={box.id}
				draggable
				onEnter={handleDragEnter}
				isDragging={isDragging}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			/>
		)
		));
	};

	const makeSelectBoxes = ()=> {

		return inventoryBoxes.filter(box=>box.select&&box).map(box => (
			<Box
				box={box}
				key={box.id}
				draggable
				onEnter={handleDragEnter}
				isDragging={isDragging}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			/>
		));
	};


	return (
		<>

			<div className="boxesGroup">{makeInventoryBoxes()}</div>
			{/* <div className="boxesGroup" id="selectBoxes">{makeSelectBoxes()}</div> */}

		</>)
}