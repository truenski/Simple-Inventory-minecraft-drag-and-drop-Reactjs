/* eslint-disable no-mixed-operators */
import { useEffect, useState } from "react";
import Box from "./Box";
import * as gameItems from "../gameItems";

export function BoxesGroup() {
  type group = {
    id?: number;
    itemID?: number;
    class?: string;
    quantity?: number;
  }[];
  const arrInventory: group = [
    { id: 42, class: "crafting-1" },
    { id: 43, class: "crafting-2" },
    { id: 44, class: "crafting-3" },
    { id: 45, class: "crafting-4" },
    { id: 46, class: "result" },
    { id: 37, class: "armory helmet" },
    { id: 38, class: "armory chest" },
    { id: 39, class: "armory legging" },
    { id: 40, class: "armory boot" },
    { id: 41, class: "armory shield" },
    { id: 1, itemID: gameItems.WOOD, quantity: 8 },
    { id: 2, itemID: gameItems.COBBLESTONE, quantity: 8 },
    { id: 3, itemID: gameItems.FLINT, quantity: 8 },
    { id: 4, itemID: gameItems.IRON, quantity: 8 },
    { id: 5, itemID: gameItems.COAL, quantity: 8 },
    { id: 6, itemID: gameItems.REDSTONE, quantity: 8 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    {
      id: 28,
      class: "select-group",
      itemID: gameItems.IRON_PICKAXE,
      quantity: 1,
    },
    {
      id: 29,
      class: "select-group",
      itemID: gameItems.STONE_SWORD,
      quantity: 1,
    },
    {
      id: 30,
      class: "select-group",
      itemID: gameItems.CHAINMAIL_HELMET,
      quantity: 1,
    },
    {
      id: 31,
      class: "select-group",
      itemID: gameItems.CHAINMAIL_CHESTPLATE,
      quantity: 1,
    },
    {
      id: 32,
      class: "select-group",
      itemID: gameItems.CHAINMAIL_BOOTS,
      quantity: 1,
    },
    {
      id: 33,
      class: "select-group",
      itemID: gameItems.CHAINMAIL_LEGGINGS,
      quantity: 1,
    },
    { id: 34, class: "select-group", itemID: gameItems.SHIELD, quantity: 1 },
    { id: 35, class: "select-group" },
    { id: 36, class: "select-group delete" },
  ];

  const [inventoryBoxes, setInventoryBoxes] = useState(arrInventory);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const swapBoxes = (fromBox: any, toBox: any) => {
    let fromIndex = -1;
    let toIndex = -1;

    for (let i = 0; i < inventoryBoxes.length; i++) {
      if (inventoryBoxes[i].id === fromBox.id) {
        fromIndex = i;
      }
      if (inventoryBoxes[i].id === toBox.id) {
        toIndex = i;
      }
    }

    if (fromIndex === toIndex) {
      return;
    }

    //delete box function
    if (toBox.id === 36) {
      inventoryBoxes[fromIndex].itemID = undefined;
      inventoryBoxes[fromIndex].quantity = undefined;

      return;
    }

    //prevent swapping result with an item
    if (
      fromBox.id === 46 &&
      inventoryBoxes[toIndex].itemID &&
      inventoryBoxes[fromIndex].itemID !== inventoryBoxes[toIndex].itemID
    ) {
      return;
    }

    //prevents armor to swap with another item inside armory box
    if (
      inventoryBoxes[fromIndex].class?.includes("armory") &&
      inventoryBoxes[toIndex].itemID !== undefined
    ) {
      return;
    }

    //Same items add quantity function
    if (
      inventoryBoxes[fromIndex].id !== inventoryBoxes[toIndex].id &&
      inventoryBoxes[fromIndex].itemID === inventoryBoxes[toIndex].itemID
    ) {
      inventoryBoxes[toIndex]!.quantity! +=
        inventoryBoxes[fromIndex]!.quantity!;

      inventoryBoxes[fromIndex].itemID = undefined;
      inventoryBoxes[fromIndex].quantity = undefined;
      if (
        toIndex === 0 ||
        toIndex === 1 ||
        toIndex === 2 ||
        toIndex === 3 ||
        toIndex === 4 ||
        fromIndex === 0 ||
        fromIndex === 1 ||
        fromIndex === 2 ||
        fromIndex === 3 ||
        fromIndex === 4
      ) {
        checkRecipe();
      }
      return;
    }

    //using only one quantity per drag in the inventory
    if (
      inventoryBoxes[fromIndex]!.quantity! > 1 &&
      !inventoryBoxes[toIndex].itemID &&
      (toIndex === 0 || toIndex === 1 || toIndex === 2 || toIndex === 3) &&
      fromIndex !== 4
    ) {
      --inventoryBoxes[fromIndex]!.quantity!;
      inventoryBoxes[toIndex].itemID = inventoryBoxes[fromIndex].itemID;
      inventoryBoxes[toIndex].quantity = 1;
      if (inventoryBoxes[fromIndex].quantity === 0) {
        inventoryBoxes[fromIndex].itemID = undefined;
      }

      if (
        toIndex === 0 ||
        toIndex === 1 ||
        toIndex === 2 ||
        toIndex === 3 ||
        toIndex === 4 ||
        fromIndex === 0 ||
        fromIndex === 1 ||
        fromIndex === 2 ||
        fromIndex === 3 ||
        fromIndex === 4
      ) {
        checkRecipe();
      }
      return;
    }

    if (fromIndex !== -1 && toIndex !== -1) {
      let {
        fromId,
        ...fromRest
      }: { fromId?: number } & {
        itemID?: number;
        class?: string;
        quantity?: number;
      } = inventoryBoxes[fromIndex];
      let {
        toId,
        ...toRest
      }: { toId?: number } & {
        itemID?: number;
        class?: string;
        quantity?: number;
      } = inventoryBoxes[toIndex];
      inventoryBoxes[fromIndex] = {
        id: fromBox.id,
        itemID: toRest.itemID,
        class: fromRest.class,
        quantity: toRest.quantity,
      };
      inventoryBoxes[toIndex] = {
        id: toBox.id,
        itemID: fromRest.itemID,
        class: toRest.class,
        quantity: fromRest.quantity,
      };
    }

    //when move item to a crafting box
    if (
      toIndex === 0 ||
      toIndex === 1 ||
      toIndex === 2 ||
      toIndex === 3 ||
      toIndex === 4 ||
      fromIndex === 0 ||
      fromIndex === 1 ||
      fromIndex === 2 ||
      fromIndex === 3 ||
      fromIndex === 4
    ) {
      checkRecipe();
    }
  };

  const checkRecipe = () => {
    const craft1 = inventoryBoxes[0];
    const craft2 = inventoryBoxes[1];
    const craft3 = inventoryBoxes[2];
    const craft4 = inventoryBoxes[3];
    const result = inventoryBoxes[4];
    const CraftingBoxes = [
      craft1.itemID,
      craft2.itemID,
      craft3.itemID,
      craft4.itemID,
    ];

    const filledCraftingBoxes = CraftingBoxes.filter((x) => x !== undefined);
    let currRecipe = null;

    //case crafting table has 4 items
    if (filledCraftingBoxes.length === 4) {
      currRecipe = CraftingBoxes.join("");
    }
    //case crafting table has 2 or 3 items
    else if (
      filledCraftingBoxes.length === 2 ||
      filledCraftingBoxes.length === 3
    ) {
      currRecipe = CraftingBoxes.map((n) => {
        if (n === undefined) {
          n = -1;
        }
        return n;
      }).join("");
    }
    //case crafting table has only 1 item
    else if (filledCraftingBoxes.length === 1) {
      currRecipe = filledCraftingBoxes.join("");
    }

    let matchRecipe = false;
    for (const key in gameItems.recipes) {
      let itemObj = gameItems.recipes[key];
      if (
        currRecipe === itemObj.recipe ||
        currRecipe === itemObj.recipe[0] ||
        currRecipe === itemObj.recipe[1]
      ) {
        matchRecipe = true;
        result.itemID = itemObj.id;
        result.quantity = itemObj.quantity;
      }
    }

    if (!matchRecipe) {
      result.itemID = undefined;
      result.quantity = undefined;
    }
  };

  const handleDragStart =
    (data: { id: any }) =>
    (event: {
      target: any;
      stopPropagation: any;
      dataTransfer: {
        setDragImage: any;
        dropEffect: any;
        effectAllowed: string;
        setData: (arg0: string, arg1: string) => void;
      };
    }) => {
      event.dataTransfer.effectAllowed = "move";
      event.target = event.target.firstElementChild;

      let fromBox = JSON.stringify({ id: data.id });
      event.stopPropagation();

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

  const handleDrop =
    (box: {
      id?: number | undefined;
      itemID?: number | undefined;
      class?: string | undefined;
    }) =>
    (event: {
      preventDefault: () => void;
      dataTransfer: {
        effectAllowed: string;
        dropEffect: string;
        getData: (arg0: string) => string;
      };
    }) => {
      event.preventDefault();

      setIsDragging(false);

      if (box.class?.includes("result")) {
        return;
      }

      if (!event.dataTransfer.getData("dragContent")) {
        return false;
      }
      let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
      let toBox = { id: box.id };


      //-1 quantity on crafting boxes when picking up result box
      if (fromBox.id === 46) {
        --inventoryBoxes[0]!.quantity!;
        --inventoryBoxes[1]!.quantity!;
        --inventoryBoxes[2]!.quantity!;
        --inventoryBoxes[3]!.quantity!;
      }

      //-1
      if (!inventoryBoxes[0]!.quantity) {
        inventoryBoxes[0].itemID = undefined;
      }
      if (!inventoryBoxes[1]!.quantity) {
        inventoryBoxes[1].itemID = undefined;
      }
      if (!inventoryBoxes[2]!.quantity) {
        inventoryBoxes[2].itemID = undefined;
      }
      if (!inventoryBoxes[3]!.quantity) {
        inventoryBoxes[3].itemID = undefined;
      }

      //Verificar se toBox pertence a armory
      //se sim - verificar tipo
      //se não - continue com swap

      if (box.class?.includes("armory")) {
        checkArmoryType(fromBox, toBox);
        return;
      }

      swapBoxes(fromBox, toBox);
      return false;
    };

  const checkArmoryType = (
    fromBox: { id: number | undefined },
    toBox: { id?: number | undefined }
  ) => {
    //Verificar Tipo de armory
    //se o fromitemID bater com o toClass, swap
    //se não, continua checagem

    let fromItem = inventoryBoxes.find((x) => x.id === fromBox.id);
    let toItem = inventoryBoxes.find((x) => x.id === toBox.id);

    if (fromItem!.itemID! !== 302 && toItem?.class?.includes("helmet")) {
      return;
    }
    if (fromItem!.itemID! !== 303 && toItem?.class?.includes("chest")) {
      return;
    }
    if (fromItem!.itemID! !== 304 && toItem?.class?.includes("legging")) {
      return;
    }
    if (fromItem!.itemID! !== 305 && toItem?.class?.includes("boot")) {
      return;
    }
    if (fromItem!.itemID! !== 442 && toItem?.class?.includes("shield")) {
      return;
    }

    swapBoxes(fromBox, toBox);
    //se from box.itemID não estar entre 302 e 305 ou 442, return
    // se tiver 302, swapboxes(fromBox,toBox)...
  };

  const makeInventoryBoxes = () => {
    return inventoryBoxes.map((box) => (
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
      <div className="boxesGroup" draggable={false}>
        {makeInventoryBoxes()}
      </div>
    </>
  );
}
