export const persistLocalStorage = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify({ ...value }))
  } catch (e) {
    console.error(e)
  }
}

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
