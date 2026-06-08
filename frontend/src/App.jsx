
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");

  // LISTAR
  async function carregarTarefas() {
    try {
      const resposta = await fetch("http://localhost:3000/tarefas");
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.error("Erro ao carregar tarefas:", erro);
    }
  }

  // CRIAR
  async function criarTarefa(e) {
  e.preventDefault();

  if (!descricao.trim()) return;

  try {
    const resposta = await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao: descricao,
      }),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao criar tarefa");
    }

    setDescricao("");

    await carregarTarefas();
  } catch (erro) {
    console.error("Erro ao criar:", erro);
  }
}

  // EXCLUIR
  async function excluirTarefa(id) {
    try {
      await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
      });

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">🎬 CineVerse</h1>

        <nav>
          <span>🍿 Filmes</span>
          <span>📺 Séries</span>
          <span>⭐ Watchlist</span>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p className="mini-title">✨ SUA WATCHLIST FAVORITA</p>

          <h2>
            Organize seus
            <br />
            filmes e séries
          </h2>

          <p>
            Salve seus títulos favoritos e monte sua própria plataforma de
            streaming pessoal.
          </p>

          <form onSubmit={criarTarefa} className="formulario">
            <input
              type="text"
              placeholder="Digite um filme ou série..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <button type="submit">
              ➕ Adicionar
            </button>
          </form>
        </div>

        <div className="hero-card">
          <span className="trend">🔥 Em alta</span>

          <h3>🚀 Interstellar</h3>

          <p>
            Uma jornada épica pelo espaço e pelo tempo para salvar a humanidade.
          </p>

          <div className="movie-info">
            <span>⭐ 9.8</span>
            <span>🎬 Ficção Científica</span>
          </div>
        </div>
      </section>

      <section className="lista">
        <h2>🍿 Minha Watchlist</h2>

        <div className="cards">
          {tarefas.map((tarefa) => (
            <div className="card" key={tarefa.id}>
              <div className="card-banner"></div>

              <h3>{tarefa.title}</h3>

              <p>🎞️ Adicionado à sua lista</p>

              <button
                className="btn-remover"
                onClick={() => excluirTarefa(tarefa.id)}
              >
                🗑️ Remover
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
