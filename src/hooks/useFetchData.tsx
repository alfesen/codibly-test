import { useEffect, useState } from 'react'
import { Data, Product } from '../types'

export const useFetchData = (
  pageNumber: number = 1,
  searchTerm: string | null
) => {
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://reqres.in/api/products?page=${pageNumber}`
      )

      const data = await res.json()

      let filteredData = data

      if (searchTerm && searchTerm != null) {
        filteredData = {
          ...data,
          data: data.data.filter((p: Product) =>
            p.id.toString().includes(searchTerm)
          ),
        }
      }
      setData(filteredData)
    }

    fetchData()
  }, [pageNumber, searchTerm])

  return data
}
