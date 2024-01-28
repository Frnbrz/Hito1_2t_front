export interface Blog {
  id?: number
  name: string
  text: string
  userEmail?: string
  comments?: Comment[]
}

export type Blogs = Blog[]


export interface Comment {
  id?: number
  text: string
  blogId: number
  userEmail?: string

}