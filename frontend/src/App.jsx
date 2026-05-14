
import { useEffect, useState } from "react";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");

  // Buscar tarefas da API
  async function carregarTarefas() {
    try {
      const resposta = await fetch("http://localhost:3000/tarefas");
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.error("Erro ao buscar tarefas:", erro);
    }
  }

  // Criar tarefa
  async function criarTarefa(e) {
    e.preventDefault();

    if (!descricao.trim()) return;

    try {
      await fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: descricao,
          description: descricao,
        }),
      });

      setDescricao("");
      carregarTarefas();
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    }
  }

  // Excluir tarefa
  async function excluirTarefa(id) {
    try {
      await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
      });

      carregarTarefas();
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Tarefas</h1>

      <form onSubmit={criarTarefa}>
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.description}

            <button
              onClick={() => excluirTarefa(tarefa.id)}
              style={{ marginLeft: "10px" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
