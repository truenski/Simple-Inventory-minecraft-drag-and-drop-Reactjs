import * as gameItems from "./gameItems";

export const materials = new Map();

materials.set("Tronco", gameItems.WOOD);
materials.set("Pedregulho", gameItems.COBBLESTONE);
materials.set("Pederneira", gameItems.FLINT);
materials.set("Barra de ferro", gameItems.IRON);
materials.set("Redstone", gameItems.REDSTONE);
materials.set("Carvão", gameItems.COAL);
materials.set("Graveto", gameItems.recipes.STICK.id);
