import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import ImgBackground from '../../../../assets/img/3807218.png';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f9fbff;
  /* background-image: url(${ImgBackground});
  background-repeat: cover;
  background-size: 100% 100vh;
  background-blend-mode: color-burn;
  background-color: rgba(255, 255, 255, 0.5); */

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 400px;
  padding: 34px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const TipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 376px;
  height: 112px;
  margin: 2rem;
  border-radius: 10px;
  background-color: #ffeaa7;

  h3 {
    padding-bottom: 8px;
  }
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tipContentContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'left',
      margin: theme.spacing(5),
    },
  }),
);
