


//Initial
export var WOOD = 17;
export var COBBLESTONE = 4;
export var FLINT = 318;
export var IRON = 265;
export var REDSTONE = 331;
export var COAL = 263;
export var IRON_PICKAXE = 257;
export var STONE_SWORD = 272;
export var CHAINMAIL_HELMET = 302;
export var CHAINMAIL_CHESTPLATE = 303;
export var CHAINMAIL_LEGGINGS = 304;
export var CHAINMAIL_BOOTS = 305;
export var SHIELD = 442;


//Craftables
type itemObj = { id: number, recipe: string[] | string };
export const recipes:Record<string,itemObj> = {
    STONE_BUTTON: { id: 77, recipe: "4" },
    WOODEN_BUTTON: { id: 143, recipe: "5" },
    IRON_NUGGET: { id: 452, recipe: "265" },
    WOOD_PLANK: { id: 5, recipe: "17" },
    CRAFTING_TABLE: { id: 58, recipe: "17171717" },
    FLINT_AND_STEEL: { id: 259, recipe: "-1265318-1" },
    GLOWSTONE: { id: 348, recipe:"89898989" },
    LEVER: { id: 69, recipe: ["280-14-1", "-1280-14"] },
    TORCH: { id: 50, recipe: ["263-1280-1", "-1263-1280"] },
    REDSTONETORCH: { id: 76, recipe: ["331-1280-1", "-1331-1280"] },
    STICK: { id: 280, recipe: ["5-15-1", "-15-15"] },
    WOODEN_PLATE: { id: 72, recipe: ["-1-155", "55-1-1"] },
    STONE_PLATE: { id: 70, recipe: ["-1-144", "44-1-1"] },
    IRON_PLATE: { id: 148, recipe: ["-1-1265265", "265265-1-1"] },
    
}
