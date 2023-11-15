// const URL_BASE = 'http://192.168.1.100:4235/';
const URL_BASE = 'http://10.0.0.11:4235/';

type MethodType = 'POST' | 'GET';

function getOptions(method: MethodType, body?: string) {
  if (method === 'GET') return;
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
  try {
    const options = getOptions(method, body);
    const response = await fetch(urlEndpoint, options);
    const resultJSON = await response.json();
    return resultJSON;
  } catch (error) {
    console.log('Error: ', error);
    throw error as Error;
  }
}
export async function getCoinList() {
  const Url = URL_BASE + 'coins';
  const data = await apiCall(Url);
  return data.coins;
}
