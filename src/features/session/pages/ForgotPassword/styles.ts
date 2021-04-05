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

  .forgot-form {
    padding: 4rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media(max-width: 1000px){
    .login-form {
      padding: 2rem 0rem;
      width: 100%;
    }
  };
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media(max-width: 1000px){
    flex-direction: row;
    align-items: center;
    justify-content: center;
  };
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
    minWidth: '400px',
    margin: '1rem',
    '@media(max-width: 1000px)': {
      margin: '20px 0px',
      minWidth: '0%',
      width: '100%',
    },
  },
  imageBackground: {
    justifySelf: 'bottom',
    width: '65%',
    height: '40%',
    '@media(max-width: 1000px)': {
      display: 'none',
    },
  },
  imageGPA: {
    width: '167px',
    height: '114px',
  },
  imageContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputAlert: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',
  },
}));
