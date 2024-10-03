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
        <Box
          sx={{
            maxHeight: '80vh', // Ограничение по высоте
            overflowY: 'auto',  // Прокрутка по вертикали
            backgroundColor: 'background.paper', // Фон модального окна
            padding: 2,
            boxShadow: 24,
            borderRadius: 1,
          }}
        >
          {children}
        </Box>
      </Modal>
    </Box>
  );
}

export default memo(BasicModal)

