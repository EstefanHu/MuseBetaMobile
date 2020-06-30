exports.useFetch = async (url, method, payload) => {
  try {
    const params = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }

    const response = await fetch(url, params);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { status: 'failure', payload: error };
  }
};