/**
 * 主要的程式邏輯
 */
import { v4 as uuidv4 } from 'uuid';
import { errorMessage } from './enum';

const todos = [];

/**
 * 取得全部代辦事項
 * @returns {array}
 */
export const getTodo = () => todos;

/**
 * 新增代辦事項
 * @param {string} payload 傳入參數
 */
export const postTodo = (payload) => {
  try {
    const { title } = JSON.parse(payload);
    if (!title) throw errorMessage.format;
    const newTodo = {
      id: uuidv4(),
      title,
      'created-time': new Date().toISOString(),
    };
    todos.push(newTodo);
  } catch (e) {
    throw errorMessage.format;
  }
};

/**
 * 編輯特定的代辦事項
 * @param {string} id 代辦事項編號
 * @param {string} payload 傳入參數
 */
export const patchTodo = ({ uuid, payload }) => {
  try {
    const todo = todos.find((item) => item.id === uuid);
    if (!todo) throw errorMessage.invalid;
    const { title } = JSON.parse(payload);
    if (!title) throw errorMessage.format;
    todo.title = title;
  } catch (e) {
    throw typeof e === 'string' ? e : errorMessage.format;
  }
};

/**
 * 刪除全部的代辦事項
 */
export const deleteTodos = () => {
  todos.splice(0, todos.length);
};

/**
 * 刪除指定的代辦事項
 * @param {string} uuid 代辦事項編號
 */
export const deleteTodo = (uuid) => {
  const index = todos.findIndex((todo) => todo.id === uuid);
  if (!~index) throw errorMessage.invalid;
  todos.splice(index, 1);
};
