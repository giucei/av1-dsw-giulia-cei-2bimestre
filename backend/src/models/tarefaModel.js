// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================

import prisma from "../config/prisma.js";

/**
 * Retorna todas as tarefas
 */
export async function obterTodasTarefas() {
  return await prisma.task.findMany();
}

/**
 * Busca tarefa por ID
 */
export async function obterTarefaPorId(id) {
  return await prisma.task.findUnique({
    where: {
      id
    }
  });
}

/**
 * Cria nova tarefa
 */
export async function criarNovaTarefa(descricao) {
  return await prisma.task.create({
    data: {
      title: descricao,
      description: descricao,
      completed: false
    }
  });
}

/**
 * Atualiza tarefa
 */
export async function atualizarTarefa(id, descricao, concluida) {
  try {
    return await prisma.task.update({
      where: {
        id
      },
      data: {
        ...(descricao !== undefined && {
          title: descricao,
          description: descricao
        }),

        ...(concluida !== undefined && {
          completed: concluida
        })
      }
    });

  } catch (erro) {
    return null;
  }
}

/**
 * Exclui tarefa
 */
export async function excluirTarefa(id) {
  try {
    return await prisma.task.delete({
      where: {
        id
      }
    });

  } catch (erro) {
    return null;
  }
}