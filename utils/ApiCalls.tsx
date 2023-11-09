const URL_BASE = 'http://localhost:4235/';

type MethodType = 'POST' | 'GET';

function getOptions(method: MethodType, body?: string) {
  if (method === 'GET') return;
  else
    return {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
}
async function apiCall(
  urlEndpoint: string,
  method: MethodType = 'GET',
  body?: string,
) {
  const options = getOptions(method, body);
  const response = await fetch(urlEndpoint, options);
  const resultJSON = await response.json();
  if (resultJSON.status !== 'success') {
    throw new Error('there was an Error');
  }
  return {status: resultJSON.status, data: resultJSON.data};
}
