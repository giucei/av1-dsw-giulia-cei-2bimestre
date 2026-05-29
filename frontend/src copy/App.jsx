
import { useEffect, useState } from "react";

function App() {
  const [series, setSeries] = useState([]);
  const [descricao, setDescricao] = useState("");

  async function carregarSeries() {
    try {
      const resposta = await fetch("http://localhost:3000/tarefas");
      const dados = await resposta.json();

      setSeries(dados);

    } catch (erro) {
      console.error(erro);
    }
  }

  async function adicionarSerie(e) {
    e.preventDefault();

    if (!descricao.trim()) return;

    try {
      await fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao,
        }),
      });

      setDescricao("");
      carregarSeries();

    } catch (erro) {
      console.error(erro);
    }
  }

  async function excluirSerie(id) {
    try {
      await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
      });

      carregarSeries();

    } catch (erro) {
      console.error(erro);
    }
  }

  useEffect(() => {
    carregarSeries();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffdde1, #ee9ca7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "20px",
          width: "450px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#d63384",
            marginBottom: "25px"
          }}
        >
          🎬 Lista de Séries
        </h1>

        <form
          onSubmit={adicionarSerie}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px"
          }}
        >
          <input
            type="text"
            placeholder="Digite uma série"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #f8bbd0",
              outline: "none"
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#ff4d8d",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Adicionar
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {series.map((serie) => (
            <li
              key={serie.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff0f5",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "12px"
              }}
            >
              <span style={{ color: "#444", fontWeight: "500" }}>
                🍿 {serie.title}
              </span>

              <button
                onClick={() => excluirSerie(serie.id)}
                style={{
                  backgroundColor: "#ff6b81",
                  color: "white",
                  border: "none",
                  padding: "7px 12px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
