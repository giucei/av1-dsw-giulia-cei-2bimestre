// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Retorna todas as tarefas
 * @route GET /tarefas
 */
export async function listarTarefas(req, res) {
  try {
    const tarefas = await TarefaModel.obterTodasTarefas();

    res.json(tarefas);

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao listar tarefas"
    });
  }
}

/**
 * Retorna uma tarefa específica pelo ID
 * @route GET /tarefas/:id
 */
export async function obterTarefa(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (Number.isNaN(idNumero)) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    const tarefa = await TarefaModel.obterTarefaPorId(idNumero);

    if (!tarefa) {
      return res.status(404).json({
        erro: "Tarefa não encontrada"
      });
    }

    res.json(tarefa);

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao buscar tarefa"
    });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criarTarefa(req, res) {
  try {
    const { descricao } = req.body;

    if (!descricao || descricao.trim() === "") {
      return res.status(400).json({
        erro: "Descrição obrigatória"
      });
    }

    const tarefaCriada = await TarefaModel.criarNovaTarefa(descricao);

    res.status(201).json(tarefaCriada);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao criar tarefa"
    });
  }
}

/**
 * Atualiza uma tarefa
 * @route PATCH /tarefas/:id
 */
export async function atualizarTarefa(req, res) {
  try {
    const idNumero = Number(req.params.id);

    const { descricao, concluida } = req.body;

    if (Number.isNaN(idNumero)) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    const tarefaAtualizada = await TarefaModel.atualizarTarefa(
      idNumero,
      descricao,
      concluida
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({
        erro: "Tarefa não encontrada"
      });
    }

    res.json({
      mensagem: "Tarefa atualizada com sucesso!",
      tarefa: tarefaAtualizada
    });

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao atualizar tarefa"
    });
  }
}

/**
 * Remove uma tarefa
 * @route DELETE /tarefas/:id
 */
export async function excluirTarefa(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (Number.isNaN(idNumero)) {
      return res.status(400).json({
        erro: "ID inválido"
      });
    }

    const tarefaRemovida = await TarefaModel.excluirTarefa(idNumero);

    if (!tarefaRemovida) {
      return res.status(404).json({
        erro: "Tarefa não encontrada"
      });
    }

    res.json({
      mensagem: "Tarefa excluída com sucesso!",
      tarefa: tarefaRemovida
    });

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao excluir tarefa"
    });
  }
}