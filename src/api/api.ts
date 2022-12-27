async function request<TResponse>(
    url: string, 
    config?: {}
  ): Promise<TResponse> {
    const response = await fetch(url, config);
    return await response.json();
  }

export const API = {
    get: <TResponse>(url: string) => 
        request<TResponse>(url),

    post: <TBody, TResponse>(url: string, body: TBody) => 
        request<TResponse>(url, { method: 'POST',  body: JSON.stringify(body) }),

    put: <TBody, TResponse>(url: string, body: TBody) => 
        request<TResponse>(url, { method: 'PUT', body: JSON.stringify(body) }),
  }