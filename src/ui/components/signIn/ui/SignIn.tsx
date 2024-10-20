import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card, SignInContainer } from './styles.ts';
import { useSubmit } from 'components/signIn';
import { FC } from 'react';
import { AppTheme } from 'core/theme';

type Props = {
  disableCustomTheme?: boolean;
};

const SignIn: FC<Props> = ({ disableCustomTheme }) => {
  const { handleSubmit, emailErrorMessage, passwordErrorMessage, emailError, validateInputs, passwordError } =
    useSubmit();
  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography component='h1' variant='h4' sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor='login'>Login</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id='login'
                type='text'
                name='login'
                placeholder='login'
                autoFocus
                required
                fullWidth
                variant='outlined'
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'name' }}
              />
            </FormControl>
            <FormControl>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='current-password'
                autoFocus
                required
                fullWidth
                variant='outlined'
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button type='submit' fullWidth variant='contained' onClick={validateInputs}>
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export { SignIn };
