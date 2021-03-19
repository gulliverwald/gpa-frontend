import { createStyles, Theme, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  padding: 30px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonAppbar = styled.button`
  text-decoration: none;
  border: none;
  background: transparent;
`;

export const useStyles = makeStyles((theme: Theme) => createStyles({
  tableContainer: {
    width: '50%',
  },
  inputForm: {
    margin: '1rem',
    width: '80%',
  },
  buttonForm: {
    margin: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    width: '100%',
  },
  modalContainer: {
    display: 'flex',
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  modalCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    border: 'none',
    padding: '2%',
    height: 'auto',
    maxWidth: '50%',
    width: 'auto',
  },
  button: {
    margin: '8px',
  },
  buttonCardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}));
