export type Product = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

export type Data = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Product[]
  url: string
  text: string
}
