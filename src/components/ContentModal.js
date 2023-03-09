import React, { useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import { Button } from '@mui/material'

import 'leaflet/dist/leaflet.css'
import './Modal.css'

// import { Button } from '@mui/material'
// import YouTubeIcon from '@mui/icons-material/YouTube'

const useStyles = styled((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#282c34',
    border: '1px solid #282c34',
    borderRadius: 10,
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}))

const ContentModal = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = (lat, lng) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        more
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>{props.children}</div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ContentModal
