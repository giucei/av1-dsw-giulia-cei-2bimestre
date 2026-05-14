// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================
// Esta camada é responsável por:
// - Comunicação com o banco de dados
// - Operações CRUD usando Prisma ORM
// - Manipulação dos dados da entidade Task

import prisma from "../config/prisma.js";

/**
 * Retorna todas as tarefas cadastradas
 * @returns {Promise<Array>}
 */
export async function obterTodasTarefas() {
  return await prisma.task.findMany({
    include: {
      category: true
    }
  });
}

/**
 * Busca uma tarefa específica pelo ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function obterTarefaPorId(id) {
  return await prisma.task.findUnique({
    where: {
      id
    },
    include: {
      category: true
    }
  });
}

/**
 * Cria uma nova tarefa
 * @param {string} descricao
 * @returns {Promise<Object>}
 */
export async function criarNovaTarefa(descricao) {
  return await prisma.task.create({
    data: {
      title: descricao.trim(),
      description: descricao.trim(),
      completed: false
    }
  });
}

/**
 * Atualiza uma tarefa existente
 * @param {number} id
 * @param {string} novaDescricao
 * @param {boolean} novoStatus
 * @returns {Promise<Object|null>}
 */
export async function atualizarTarefa(id, novaDescricao, novoStatus) {
  try {
    return await prisma.task.update({
      where: {
        id
      },
      data: {
        ...(novaDescricao !== undefined && {
          description: novaDescricao.trim(),
          title: novaDescricao.trim()
        }),

        ...(novoStatus !== undefined && {
          completed: novoStatus
        })
      }
    });
  } catch (error) {
    return null;
  }
}

/**
 * Exclui uma tarefa pelo ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function excluirTarefa(id) {
  try {
    return await prisma.task.delete({
      where: {
        id
      }
    });
  } catch (error) {
    return null;
  }
}
