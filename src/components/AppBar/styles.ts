import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const Container = styled.div`

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
    height: '57px',
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
}));
