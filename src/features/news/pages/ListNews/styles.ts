import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core';

export const Container = styled.div`
  margin: 100px 0px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  padding: 30px 0px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const useStyles = makeStyles(() => createStyles({
  media: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
  gridContainer: {
    width: '80%',
  },
  paper: {
    width: '90%',
    margin: '30px',
  },
  dateContainer: {
    padding: '8px 0px',
    alignSelf: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  link: {
    textDecoration: 'none',
  },
}));
