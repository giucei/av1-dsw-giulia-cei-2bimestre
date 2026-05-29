
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");

  async function carregarTarefas() {
    try {
      const resposta = await fetch("http://localhost:3000/tarefas");
      const dados = await resposta.json();

      setTarefas(dados);
    } catch (erro) {
      console.error(erro);
    }
  }

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
      console.error(erro);
    }
  }

  async function excluirTarefa(id) {
    try {
      await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
      });

      carregarTarefas();
    } catch (erro) {
      console.error(erro);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="app">

      <header className="navbar">
        <h1>🎬 CineVerse</h1>

        <div className="nav-links">
          <span>🍿 Filmes</span>
          <span>📺 Séries</span>
          <span>⭐ Favoritos</span>
        </div>
      </header>

      <section className="hero">

        <div className="hero-text">

          <p className="mini-title">
            SUA WATCHLIST FAVORITA ✨
          </p>

          <h2>
            Organize sua
            <br />
            watchlist perfeita 🍿
          </h2>

          <p>
            Adicione títulos à sua lista e monte
            sua própria plataforma de streaming.
          </p>

          <form onSubmit={criarTarefa}>

            <input
              type="text"
              placeholder="Digite um filme ou série..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <button type="submit">
              Adicionar ✨
            </button>

          </form>

        </div>

        <div className="hero-card">

          <span className="trend">
            🔥 Em alta no momento
          </span>

          <h3>🚀 Interstellar</h3>

          <p className="movie-desc">
            Uma jornada épica pelo espaço,
            tempo e sobrevivência da humanidade.
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

              <div className="card-content">

                <h3>{tarefa.title}</h3>

                <p>
                  🎬 Adicionado à sua lista
                </p>

                <button
                  onClick={() => excluirTarefa(tarefa.id)}
                >
                  🗑️ Remover
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default App;
