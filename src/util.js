/**
 * 取得 http 回傳的內容
 * @param {boolean} success 是否為成功類型
 * @param {string|array} data 回傳的內容
 * @returns {string} JSON 格式內容
 */
export const getHttpResponseText = ({ success = true, data = [] }) => {
  const result = { status: success ? 'success' : 'error' };
  result[success ? 'data' : 'message'] = data;
  return JSON.stringify(result);
};

/**
 * 取得 http 傳入的內容
 * @param {object} request http request
 * @returns {string} JSON 格式內容
 */
export const getHttpRequestBody = async (request) => {
  const buffers = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};

/**
 * 取得網址的 uuid param
 * @param {string} url 網址
 * @returns {string} uuid
 */
export const getUrlUUID = (url) => url.split('/').pop();
