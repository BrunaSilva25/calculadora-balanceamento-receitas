import React, { useState } from "react";
import "./App.css";

function App() {
  const [receitas, setReceitas] = useState([]);
  const [nomeReceita, setNomeReceita] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [quantidadeFarinha, setQuantidadeFarinha] = useState("");

  const adicionarReceita = () => {
    if (nomeReceita && ingredientes.length > 0) {
      setReceitas([...receitas, { nome: nomeReceita, ingredientes }]);
      setNomeReceita("");
      setIngredientes([]);
    }
  };

  const adicionarIngrediente = (nome, porcentagem) => {
    setIngredientes([...ingredientes, { nome, porcentagem: parseFloat(porcentagem) }]);
  };

  const calcularIngredientes = (receita) => {
    const farinha = parseFloat(quantidadeFarinha);
    if (!isNaN(farinha)) {
      return receita.ingredientes.map((ingrediente) => ({
        nome: ingrediente.nome,
        quantidade: ((ingrediente.porcentagem / 100) * farinha).toFixed(2),
      }));
    }
    return [];
  };

  return (
    <div className="App">
      <h1>Calculadora para Balanceamento de Receitas da Padaria</h1>

      <div>
        <h2>Adicionar Receita</h2>
        <input
          type="text"
          placeholder="Nome da Receita"
          value={nomeReceita}
          onChange={(e) => setNomeReceita(e.target.value)}
        />
        <button onClick={adicionarReceita}>Adicionar Receita</button>

        <h3>Adicionar Ingredientes</h3>
        <ul>
          {ingredientes.map((item, index) => (
            <li key={index}>{item.nome} - {item.porcentagem}%</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Nome do Ingrediente"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const nome = e.target.value;
              const porcentagem = prompt("Porcentagem do Ingrediente:");
              if (porcentagem) adicionarIngrediente(nome, porcentagem);
              e.target.value = "";
            }
          }}
        />
      </div>

      <div>
        <h2>Receitas</h2>
        <ul>
          {receitas.map((receita, index) => (
            <li key={index}>
              <strong>{receita.nome}</strong>
              <ul>
                {receita.ingredientes.map((ing, i) => (
                  <li key={i}>{ing.nome} - {ing.porcentagem}%</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Calcular Ingredientes</h2>
        <input
          type="number"
          placeholder="Quantidade de Farinha (g)"
          value={quantidadeFarinha}
          onChange={(e) => setQuantidadeFarinha(e.target.value)}
        />
        <button
          onClick={() => {
            const receita = receitas[0]; // Usando a primeira receita como exemplo
            if (receita) {
              const resultado = calcularIngredientes(receita);
              alert(JSON.stringify(resultado, null, 2));
            }
          }}
        >
          Calcular
        </button>
      </div>
    </div>
  );
}

export default App;
