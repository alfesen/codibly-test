import { Fragment, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import s from './ProductList.module.scss'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Typography,
} from '@mui/material'

import { Data, Product } from '../../types'
import { useFetchData } from '../../hooks/useFetchData'

import ProductModal from '../ProductModal/ProductModal'

type ModalData = Product | null

const ProductList = () => {
  const { search, pathname } = useLocation()
  const { replace } = useHistory()

  const searchParams = new URLSearchParams(search)
  const page = +searchParams.get('page')! || 1
  const term = searchParams.get('search')! || ''

  const fetchData = useFetchData(page, term)

  const [currentPage, setCurrentPage] = useState<number>(page - 1)
  const [modalData, setModalData] = useState<ModalData>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [data, setData] = useState<Data>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setData(fetchData)
    if (fetchData) {
      setIsLoading(false)
    }
  }, [fetchData, data, isLoading, currentPage, term])

  const openModal = (info: Product) => {
    setShowModal(true)
    setModalData(info)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalData(null)
  }

  const rows =
    !isLoading &&
    data!.data.map(prod => {
      return (
        <TableRow
          onClick={() => openModal(prod)}
          className={s['product-list__item']}
          style={{ backgroundColor: prod.color }}
          key={prod.id}>
          <TableCell>
            <Typography style={{ textTransform: 'uppercase' }} variant='body2'>
              {prod.id}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography style={{ textTransform: 'uppercase' }} variant='body2'>
              {prod.name}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography style={{ textTransform: 'uppercase' }} variant='body2'>
              {prod.year}
            </Typography>
          </TableCell>
        </TableRow>
      )
    })

  const paginate = (event: unknown, newPage: number) => {
    const pageQuery = new URLSearchParams({
      page: (newPage + 1).toString(),
      search: term.toString(),
    })
    replace({ pathname: pathname, search: pageQuery.toString() })
    setCurrentPage(newPage)
  }

  return (
    <Fragment>
      {!isLoading && data!.data.length === 0 && <h1>No products found</h1>}
      {!isLoading && data!.data.length > 0 && (
        <Paper>
          <TableContainer sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> id </TableCell>
                  <TableCell> name </TableCell>
                  <TableCell> year </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[data!.per_page]}
                    colSpan={3}
                    count={12}
                    rowsPerPage={data!.per_page}
                    page={+currentPage!}
                    onPageChange={paginate}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {showModal && (
        <ProductModal
          isOpened={showModal}
          onClose={closeModal}
          data={modalData!}></ProductModal>
      )}
    </Fragment>
  )
}

export default ProductList
