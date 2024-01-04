export interface Note {
  id: number
  content: string
  date: string
  important: boolean
}

export interface NoteInfo {
  notes: Array<Note>
}
