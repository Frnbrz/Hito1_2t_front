function App() {
  return (
    <button
      onClick={async () => {
        const response = await fetch('/api/v1/')
        const data = await response.text()
        console.log(data)
      }}
    >
      Click me
    </button>
  )
}
export default App
