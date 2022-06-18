import { useEffect, useState } from "react";
import Box from "./Box";

export function BoxesGroup() {

	type group = { id?: number, name?: number, class?:string }[]
	const arrInventory: group = [
		{ id: 42, class:"crafting-1" },{ id: 43, class:"crafting-2" },{ id: 44, class:"crafting-3" },{ id: 45, class:"crafting-4" },{ id: 46, class:"result" },
		{ id: 37, class:"armory helmet"}, { id: 38, class:"armory chest" }, { id: 39, class:"armory legging"}, { id: 40, class:"armory boot" },{ id: 41, class:"armory shield" },
		{ id: 1, name: 110 }, { id: 2, name: 115 }, { id: 3, name: 364 }, { id: 4, name: 243 }, { id: 5, name: 225 }, { id: 6, name: 4 }, { id: 7 }, { id: 8 }, { id: 9 },
		{ id: 10}, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 },
		{ id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 },
		{ id: 28, class:"select-group", name :118 }, { id: 29, class:"select-group" }, { id: 30, class:"select-group" }, { id: 31,class:"select-group" }, { id: 32, class:"select-group" }, { id: 33, class:"select-group" }, { id: 34, class:"select-group" }, { id: 35, class:"select-group" }, { id: 36, class:"select-group delete" }
		
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

        if(toBox.id == 36){
			inventoryBoxes[fromIndex].name = undefined;
			return
		}


		//se os index foram atribuidos
		//pega o name e class no index
		//Troca os elementos de inventory box
		
		if (fromIndex !== -1 && toIndex !== -1) {
			let { fromId, ...fromRest }: { fromId?: number } & { name?: number, class?:string } = inventoryBoxes[fromIndex];
			let { toId, ...toRest }: { toId?: number } & { name?: number, class?:string } = inventoryBoxes[toIndex];
			inventoryBoxes[fromIndex] = { id: fromBox.id, name:toRest.name, class:fromRest.class };
			inventoryBoxes[toIndex] = { id: toBox.id, name:fromRest.name, class:toRest.class };

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

	const handleDrop = ( box: {
		id?: number | undefined;
		name?: number | undefined;
		class?: string | undefined;
	}) => (event: {
		preventDefault: () => void; dataTransfer: {
			getData: (arg0: string) => string;
		};
	}) => {
		event.preventDefault();
		setIsDragging(false);

		if(box.class?.includes("result")){return}

		let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
		let toBox = { id: box.id };


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



	return (
		<>

			<div className="boxesGroup">{makeInventoryBoxes()}</div>

		</>)
}