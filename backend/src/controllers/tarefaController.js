// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Retorna todas as tarefas
 * @route GET /tarefas
 */
export async function listarTarefas(req, res) {
  const tarefas = await TarefaModel.obterTodasTarefas();

  res.json(tarefas);
}

/**
 * Retorna uma tarefa específica pelo ID
 * @route GET /tarefas/:id
 */
export async function obterTarefa(req, res) {
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
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criarTarefa(req, res) {
  const { descricao } = req.body;

  if (typeof descricao !== "string" || descricao.trim() === "") {
    return res.status(400).json({
      erro: "Descrição é obrigatória"
    });
  }

  const tarefaCriada = await TarefaModel.criarNovaTarefa(descricao);

  res.status(201).json({
    mensagem: "Tarefa criada com sucesso!",
    tarefa: tarefaCriada
  });
}

/**
 * Atualiza uma tarefa
 * @route PATCH /tarefas/:id
 */
export async function atualizarTarefa(req, res) {
  const idNumero = Number(req.params.id);

  const { descricao, concluida } = req.body;

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({
      erro: "ID inválido"
    });
  }

  if (
    descricao !== undefined &&
    (typeof descricao !== "string" || descricao.trim() === "")
  ) {
    return res.status(400).json({
      erro: "Descrição inválida"
    });
  }

  if (concluida !== undefined && typeof concluida !== "boolean") {
    return res.status(400).json({
      erro: "concluida deve ser boolean"
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
}

/**
 * Remove uma tarefa
 * @route DELETE /tarefas/:id
 */
export async function excluirTarefa(req, res) {
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
}
