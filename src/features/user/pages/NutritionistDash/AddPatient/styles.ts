import { createStyles, Theme, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
`;

export const ButtonAppbar = styled.button`
  text-decoration: none;
  border: none;
  background: transparent;
`;

export const useStyles = makeStyles((theme: Theme) => createStyles({
  appbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '50px',
    width: '100%',
    position: 'relative',
    padding: theme.spacing(0, 10),
    background: 'white',
    color: 'black',
  },
  returnAppbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
  },
  form: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  inputForm: {
    margin: '1rem',
    width: '80%',
  },
  inputFormTiny: {
    margin: '1rem',
    width: '30%',
  },
  formColumn: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonForm: {
    margin: theme.spacing(2),
  },
  streetForm: {
    display: 'flex',
    width: '84%',
    flexDirection: 'row',
  },
}));
