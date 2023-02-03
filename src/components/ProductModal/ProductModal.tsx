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

import { ModalProps } from '../../types'

const ProductModal = ({ isOpened, onClose, data }: ModalProps) => {
  const { id, name, year, color, pantone_value } = data

  return (
    <Dialog open={isOpened}>
      <DialogTitle>Complete info</DialogTitle>
      <DialogContent>
        <Stack>
          <Typography variant='overline'>Id: {id}</Typography>
          <Typography variant='overline'>Name: {name}</Typography>
          <Typography variant='overline'>Year: {year}</Typography>
          <Typography variant='overline'>Color: {color}</Typography>
          <Typography variant='overline'>
            Pantone value: {pantone_value}
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
