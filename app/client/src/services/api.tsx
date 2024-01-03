import { Bdlist } from "../types/bdlist.types"

const api = {
    bd: {
      list: async (): Promise<Bdlist[]> => {
        return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQXXR6qX9UlHQz27QV0XaHCHfklBScja4bXMOV1sOlGVw7HIttXMZWX4VCkykphrAD4SiHZ3Efi4Mne/pub?output=tsv').then(res => res.text()).then(text => {
          return text.split('\n').slice(1).map(line => {
            const [usuario, password, nombre, apellido, telefono, email ] = line.split('\t')
            return { usuario, password, nombre, apellido, telefono, email }
          }
            
            
          )
        })
      }
    }
}
  
export default api