import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import * as React from 'react';

interface ConfirmationDialogProps {
  handleDelete: () => void;
  handleClose: () => void;
  open: boolean;
  message: string;
  title: string;
}

export default function ConfirmationDialog({
  handleDelete,
  handleClose,
  open,
  message,
  title,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
    >
      <DialogTitle>
        {message}
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontFamily: 'monospace',
            color: '#706e6e',
            fontSize: '12px',
            flexGrow: 1,
            maxWidth: '180px',
          }}>
          {title}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={() => {
          handleDelete();
          handleClose();
        }}>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
}