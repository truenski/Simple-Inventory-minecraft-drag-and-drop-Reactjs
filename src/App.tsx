import React from "react";
import "./App.css";
import { BoxesGroup } from "./Components/BoxesGroup";
import { materials } from "./materials";
import { recipes } from "./recipes";
function App() {
  const recipeArr: any = [];
  recipes.forEach((value, key) =>
    recipeArr.push(
      <>
        <li className="list">
          <b>{key}</b>
          {" <-" + value}
        </li>
        <br />
      </>
    )
  );

  const materialsArr: any = [];
  materials.forEach((value, key) =>
    materialsArr.push(
      <>
        <li className="list materials">
          <b>{key}</b>
          {" <-"}
          <img className="box" src={"/images/" + value + "-0.png"} alt={key} />
        </li>
        <br />
      </>
    )
  );

  return (
    <div className="App">
      <h1>Inventory</h1>

      <p>Arraste, Solte, Equipe, Delete, Crie.</p>
      <div id="inventory-div">
        <div id="inventory">
          <p className="crafting-text">Crafting</p>
          <div className="steve-background"></div>
          <div className="result-arrow"></div>
          <BoxesGroup />
        </div>
      </div>
      <a
        href="https://github.com/truenski/Simple-Inventory-minecraft-drag-and-drop-Reactjs"
        className="github-link"
      >
        <small style={{ float: "right" }}>by Kesney Mendes Viana</small>
      </a>
      <small className="about">
        Este projeto é a reprodução de um menu pop-up do jogo Minecraft, feito
        apenas com Reactjs, CSS, e a API de drag-and-drop do HTML5.
        <br />
        <br /> O inventário em Minecraft é um menu, usado pelo jogador para
        gerenciar os itens que carrega. A partir desta tela, um jogador pode
        equipar armaduras, criar itens em uma grade 2×2 e equipar ferramentas,
        blocos e itens. <br />
        <br />
        <b>Materiais:</b>
        <br />
        <br />
        <ul>{materialsArr}</ul>
        <b>Receitas Disponíveis:</b>
        <br />
        <br />
        <ul>{recipeArr}</ul>
      </small>
    </div>
  );
}

export default App;
