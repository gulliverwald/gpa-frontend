import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  background: #ffffff;

  .login-form {
    padding: 8rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inputField: {
    width: '100%',
    minWidth: '300px',
    margin: '1rem',
  },
}));
