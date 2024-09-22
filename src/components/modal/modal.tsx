import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {memo, ReactNode} from 'react';


function BasicModal({open, handleClose, children}: { open: boolean, handleClose?: () => void, children: ReactNode }) {

  return (
    <Box sx={{flexGrow: 1}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <>
          {children}
        </>
      </Modal>
    </Box>
  );
}

export default memo(BasicModal)

