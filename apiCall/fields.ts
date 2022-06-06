export const getFields = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL)
    const { data } = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export const postFields = async (body: any) => {
  try {
    const response: any = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    return null
  }
}
