import React from 'react';

export default function handleCloseDialog(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  setOpen(false);
}