exports.useFetch = async (url, method, body, token) => {
  try {
    const params = { method }
    console.log(url)

    method === 'GET' ? params.headers = {}
      : params.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    if (token) params.headers.Authorization = `Bearer ${token}`;
    if (body) params.body = JSON.stringify(body);

    const response = await fetch(url, params);
    const data = await response.json();

    console.log(data.status)

    return data;
  } catch (error) {
    return { status: 'failure', payload: error };
  }
};