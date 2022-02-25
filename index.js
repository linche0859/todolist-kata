import http from 'http';
import { responseHeader as header } from './src/config';
import { httpMethod, errorMessage } from './src/enum';
import {
  getHttpResponseText,
  getHttpRequestBody,
  getUrlUUID,
} from './src/util';
import {
  getTodo,
  postTodo,
  patchTodo,
  deleteTodos,
  deleteTodo,
} from './src/main';

const baseUrl = '/todos';
const requestListener = async (request, response) => {
  const { url, method } = request;
  let statusCode = 200;
  let responseText = '';

  switch (true) {
    // 取得全部代辦事項
    case method === httpMethod.GET && url === baseUrl:
      responseText = getHttpResponseText({ data: getTodo() });
      break;
    // 新增代辦事項
    case method === httpMethod.POST && url === baseUrl:
      try {
        postTodo(await getHttpRequestBody(request));
        responseText = getHttpResponseText({ data: getTodo() });
      } catch (message) {
        statusCode = 400;
        responseText = getHttpResponseText({ success: false, data: message });
      }
      break;
    // 編輯特定的代辦事項
    case method === httpMethod.PATCH && url.startsWith(`${baseUrl}/`):
      try {
        patchTodo({
          uuid: getUrlUUID(url),
          payload: await getHttpRequestBody(request),
        });
        responseText = getHttpResponseText({ data: getTodo() });
      } catch (message) {
        statusCode = 400;
        responseText = getHttpResponseText({ success: false, data: message });
      }
      break;
    // 刪除全部代辦事項
    case method === httpMethod.DELETE && url === baseUrl:
      deleteTodos();
      responseText = getHttpResponseText({ data: getTodo() });
      break;
    // 刪除指定的代辦事項
    case method === httpMethod.DELETE && url.startsWith(`${baseUrl}/`):
      try {
        deleteTodo(getUrlUUID(url));
        responseText = getHttpResponseText({ data: getTodo() });
      } catch (message) {
        statusCode = 400;
        responseText = getHttpResponseText({
          success: false,
          data: message,
        });
      }
      break;
    case method === httpMethod.OPTIONS:
      break;
    default:
      statusCode = 404;
      responseText = getHttpResponseText({
        success: false,
        data: errorMessage.router,
      });
      break;
  }

  response.writeHead(statusCode, header);
  response.write(responseText);
  response.end();
};

const server = http
  .createServer(requestListener)
  .listen(process.env.PORT || 8080);

console.log('Server is up and running');

export default server;
