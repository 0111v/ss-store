const url = '/api/products'

function getFetchConfig(
  {id, method, body}: {id?: string, body?: unknown, method: string}
) {
  const fullPath = id
  ? `${url}/${id}`
  : `${url}`


  if (method === 'GET' || method === 'DELETE')
    return {url: fullPath, options: { method }}

  return {
    url: fullPath,
    options: {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
} 

export async function serviceRun<T>(
  {id, method, body}: {
    id?: string, 
    body?: unknown, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  }
): Promise<T> {
  const {url, options} = getFetchConfig({ method, id, body })
  const res = await fetch(url, options)
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error)
  }
  return res.json()
}