import { Input } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { pathname, search } = useLocation()
  const { replace } = useHistory()

  const searchParams = new URLSearchParams(search)
  const page = +searchParams.get('page')! || 1

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return
    setSearchTerm(e.target.value)
    const searchQuery = new URLSearchParams({
      page: page.toString(),
      search: e.target.value.toString(),
    })
    replace({
      pathname: pathname,
      search: searchQuery.toString(),
    })
  }

  return (
    <Input
    placeholder='Search by id...'
      sx={{ width: '100%', margin: '2em 0' }}
      value={searchTerm}
      onChange={searchInputHandler}
    />
  )
}

export default SearchInput
