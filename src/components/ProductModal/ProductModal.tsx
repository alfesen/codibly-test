import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material'
import { Product } from '../../types'

type Props = {
  isOpened: boolean
  onClose: Function
  data: Product
}

const ProductModal = ({ isOpened, onClose, data }: Props) => {
  return (
    <Dialog open={isOpened}>
      <DialogTitle>Complete info</DialogTitle>
      <DialogContent>
        <Stack>
          <Typography variant='overline'>Id: {data.id}</Typography>
          <Typography variant='overline'>Name: {data.name}</Typography>
          <Typography variant='overline'>Year: {data.year}</Typography>
          <Typography variant='overline'>Color: {data.color}</Typography>
          <Typography variant='overline'>
            Pantone value: {data.pantone_value}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Box width='100%' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='text' onClick={() => onClose()}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ProductModal
