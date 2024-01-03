function App() {
  return (
    <button
      onClick={async () => {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQXXR6qX9UlHQz27QV0XaHCHfklBScja4bXMOV1sOlGVw7HIttXMZWX4VCkykphrAD4SiHZ3Efi4Mne/pub?output=tsv')

        const text = await response.text()
        console.log(text.split('\n'))
      }}
    >
      Click me
    </button>
  )
}
export default App
