/**
 * Get Tokens
 * @returns
 */
export async function getTokens(address) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_DECOMMAS_API}tokens/${address}?api-key=${import.meta.env.VITE_DECOMMAS_API_KEY}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 * Get Coin
 * @returns
 */
export async function getCoin(address) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_DECOMMAS_API}coins/${address}?api-key=${import.meta.env.VITE_DECOMMAS_API_KEY}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 * Get Transaction
 * @returns
 */
export async function getTransaction(address) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_DECOMMAS_API}transactions/${address}?api-key=${import.meta.env.VITE_DECOMMAS_API_KEY}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}