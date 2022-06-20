import { useEffect, useState } from "react";
import Box from "./Box";

//Initial Items
var COBBLESTONE = 4;
var WOOD = 17;
var FLINT = 318;
var IRON = 265;
var REDSTONE = 331;
var COAL = 263;
var IRON_PICKAXE = 257;
var STONE_SWORD = 272;
var CHAINMAIL_HELMET = 302;
var CHAINMAIL_CHESTPLATE = 303;
var CHAINMAIL_LEGGINGS = 304;
var CHAINMAIL_BOOTS = 305;
var SHIELD = 442;



//Craftables
var WOODEN_BUTTON = 143;
var STONE_BUTTON = 77;
var IRON_NUGGET = 452;
var WOOD_PLANK = 5;
var CRAFTING_TABLE = 58;
var FLINT_AND_STEEL = 259;
var LEVER = 69;
var TORCH = 50;
var REDSTONETORCH = 76;
var STICK = 280;
var WOODEN_PLATE = 72;
var STONE_PLATE = 70;
var IRON_PLATE = 148;





export function BoxesGroup() {

	

	type group = { id?: number, itemID?: number, class?:string }[]
	const arrInventory: group = [
		{ id: 42, class:"crafting-1" },{ id: 43, class:"crafting-2" },{ id: 44, class:"crafting-3" },{ id: 45, class:"crafting-4" },{ id: 46, class:"result" },
		{ id: 37, class:"armory helmet"}, { id: 38, class:"armory chest" }, { id: 39, class:"armory legging"}, { id: 40, class:"armory boot" },{ id: 41, class:"armory shield" },
		{ id: 1, itemID: WOOD }, { id: 2, itemID: COBBLESTONE }, { id: 3, itemID: FLINT }, { id: 4, itemID: IRON }, { id: 5, itemID: REDSTONE }, { id: 6, itemID: COAL }, { id: 7}, { id: 8 }, { id: 9},
		{ id: 10}, { id: 11 }, { id: 12}, { id: 13}, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 },
		{ id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 },
		{ id: 28, class:"select-group", itemID:IRON_PICKAXE  }, { id: 29, class:"select-group", itemID:STONE_SWORD }, { id: 30, class:"select-group", itemID:CHAINMAIL_HELMET }, { id: 31,class:"select-group", itemID:CHAINMAIL_CHESTPLATE }, { id: 32, class:"select-group", itemID:CHAINMAIL_BOOTS  }, { id: 33, class:"select-group", itemID:CHAINMAIL_LEGGINGS }, { id: 34, class:"select-group", itemID:SHIELD }, { id: 35, class:"select-group" }, { id: 36, class:"select-group delete" }
		
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

		//delete box function
        if(toBox.id == 36){
			inventoryBoxes[fromIndex].itemID = undefined;
			return
		}

		//prevents armor to swap with another item inside armory box
		if(inventoryBoxes[fromIndex].class?.includes("armory") && inventoryBoxes[toIndex].itemID !== undefined){
			return}
		
		//se os index foram atribuidos
		//pega o itemID e class no index
		//Troca os elementos de inventory box
		
		if (fromIndex !== -1 && toIndex !== -1) {
			let { fromId, ...fromRest }: { fromId?: number } & { itemID?: number, class?:string } = inventoryBoxes[fromIndex];
			let { toId, ...toRest }: { toId?: number } & { itemID?: number, class?:string } = inventoryBoxes[toIndex];
			inventoryBoxes[fromIndex] = { id: fromBox.id, itemID:toRest.itemID, class:fromRest.class };
			inventoryBoxes[toIndex] = { id: toBox.id, itemID:fromRest.itemID, class:toRest.class };

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
		itemID?: number | undefined;
		class?: string | undefined;
	}) => (event: {
		preventDefault: () => void; dataTransfer: {
			getData: (arg0: string) => string;
		};
	}) => {
		event.preventDefault();
		setIsDragging(false);

		if(box.class?.includes("result")){return}
		
		if(!event.dataTransfer.getData("dragContent")){return false}
		let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
		let toBox = { id: box.id };

//Verificar se toBox pertence a armory
//se sim - verificar tipo
//se não - continue com swap

		if(box.class?.includes("armory")){checkArmoryType(fromBox,toBox); return}

		swapBoxes(fromBox, toBox)
		return false;
	};

	const checkArmoryType = (fromBox: { id: number | undefined},toBox: {id?: number | undefined}) => {
		
//Verificar Tipo de armory
//se o fromitemID bater com o toClass, swap
//se não, continua checagem

		let fromItem = inventoryBoxes.find(x => x.id === fromBox.id);
		let toItem = inventoryBoxes.find(x => x.id === toBox.id);

if(fromItem!.itemID! !== 302 && toItem?.class?.includes("helmet")){return}
if(fromItem!.itemID! !== 303 && toItem?.class?.includes("chest")){return}
if(fromItem!.itemID! !== 304 && toItem?.class?.includes("legging")){return}
if(fromItem!.itemID! !== 305 && toItem?.class?.includes("boot")){return}
if(fromItem!.itemID! !== 442 && toItem?.class?.includes("shield")){return}

swapBoxes(fromBox,toBox)
		//se from box.itemID não estar entre 302 e 305 ou 442, return
		// se tiver 302, swapboxes(fromBox,toBox)...   
	}

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