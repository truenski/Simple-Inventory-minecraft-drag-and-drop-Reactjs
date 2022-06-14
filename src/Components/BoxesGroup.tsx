import { useEffect, useState } from "react";
import Box from "./Box";

export function BoxesGroup() {

	const arrInventory: { id?: number, name?: number }[] = [
		{ id: 1, name: 110 }, { id: 2, name: 115 }, { id: 3, name: 364 }, { id: 4, name: 243 }, { id: 5, name: 225 }, { id: 6, name: 4 }, { id: 7 }, { id: 8 }, { id: 9 },
		{ id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 },
		{ id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 },
	]

    const arrSelect: { id?: number, name?: number }[] = [
		{ id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }, { id: 35 }, { id: 36 }
	]

	const arrArmory: { id?: number, name?: number }[] = [
		 { id: 37}, { id: 38 }, { id: 39 }, { id: 40 }
	]

	const arrCraft:  { id?: number, name?: number }[] = [
		{ id: 41 }, { id: 42 }, { id: 43 }, { id: 44 }
   ]

   const arrCrafted:  { id?: number, name?: number }[] = [
	{ id: 45 }
]

	const [inventoryBoxes, setInventoryBoxes] = useState(arrInventory)
	const [selectBoxes, setSelectBoxes] = useState(arrSelect)
	
	const [isDragging, setIsDragging] = useState<boolean>(false)

	const swapBoxes = (fromBox: any, toBox: any) => {
		let boxeSlice = inventoryBoxes.slice();
		let fromIndex = -1;
		let toIndex = -1;

		for (let i = 0; i < boxeSlice.length; i++) {
			if (boxeSlice[i].id === fromBox.id) {
				fromIndex = i;
			}
			if (boxeSlice[i].id === toBox.id) {
				toIndex = i;
			}
		}


		if (fromIndex !== -1 && toIndex !== -1) {
			let { fromId, ...fromRest }: { fromId?: number } & { name?: number } = boxeSlice[fromIndex];
			let { toId, ...toRest }: { toId?: number } & { name?: number } = boxeSlice[toIndex];
			boxeSlice[fromIndex] = { id: fromBox.id, ...toRest };
			boxeSlice[toIndex] = { id: toBox.id, ...fromRest };


			setInventoryBoxes(boxeSlice)
		}
	}


	const handleDragStart = (data: { id: any; }) => (event: {
		target: any;
		stopPropagation: any; dataTransfer: {
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
		swapBoxes(fromBox, toBox);
		return false;
	};

	
	const makeBoxes = (prop:{
		id?: number | undefined;
		name?: number | undefined;
	}[]) => {
		


		return prop.map(box => (
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

			<div className="boxesGroup">{makeBoxes(inventoryBoxes)}</div>
			<div className="boxesGroup" id="selectBoxes">{makeBoxes(selectBoxes)}</div>

		</>)
}