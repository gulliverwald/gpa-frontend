import styled from 'styled-components';
import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #F9FBFF;
`;

export const BoxContainer = styled.div`
  display: flex;
  background-color: white;
  width: 80%;
  height: 80%;
  margin-top: -30px;

  border-radius: 21px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    padding: 16px 0px;
  }

  .antropo-data {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    align-items: center;
    justify-items: center;

    div {
      padding: 16px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      span {
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        }
      }
    }

`;

export const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    width: '70%',
    padding: '20px',
  },
  accordion: {
    margin: '0px 0px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordionDetail: {
    display: 'flex',
    flexDirection: 'column',
  },
  foodTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
