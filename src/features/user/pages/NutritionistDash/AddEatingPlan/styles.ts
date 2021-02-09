import { createStyles, Theme, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Button = styled.button`
  text-decoration: none;
  border: none;
  background: transparent;
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);
