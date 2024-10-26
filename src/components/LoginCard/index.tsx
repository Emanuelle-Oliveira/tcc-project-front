import {Button, Container, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import theme from '@/styles/theme';
import Typography from '@mui/material/Typography';
import {Formik} from 'formik';
import React from 'react';

export default function LoginCard() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.secondary.main,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography
            variant='h6'
            noWrap
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
           Login
          </Typography>
        </Box>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values, actions) => {
          }}>
          {({ values, handleSubmit, setFieldValue }) => {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  sx={{ width: '300px', marginBottom: '10px', marginTop: '10px' }}
                  slotProps={{ input: { style: { fontSize: '14px', color: theme.palette.primary.main } }, inputLabel: { style: { fontSize: '14px', color: theme.palette.primary.main } }}}
                  label='Email'
                  variant='outlined'
                  size='small'
                  value={values.email}
                  onChange={(value) => {
                    setFieldValue('email', value.target.value);
                  }}
                />
                <TextField
                  sx={{ width: '300px', marginBottom: '10px', marginTop: '10px' }}
                  slotProps={{ input: { style: { fontSize: '14px', color: theme.palette.primary.main } }, inputLabel: { style: { fontSize: '14px', color: theme.palette.primary.main } }}}
                  label='Senha'
                  variant='outlined'
                  size='small'
                  value={values.password}
                  onChange={(value) => {
                    setFieldValue('password', value.target.value);
                  }}
                />
                <Button
                  sx={{bgcolor: theme.palette.primary.main, color: theme.palette.secondary.light}}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Enviar
                </Button>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}