import { makeStyles, Theme, createStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerApp: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%',
      width: '100%',
      color: 'black',
      padding: theme.spacing(2),
    },
    crn: {
      fontSize: '12px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%',
      width: '100%',
      color: 'black',
      padding: '20px 20px',
    },
    appbar: {
      background: '#E7F3FF',
      gridArea: 'AB',
      position: 'relative',
      height: '100px',
      width: '100%',
      display: 'flex',
    },
  }),
);
