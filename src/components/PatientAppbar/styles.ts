import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core';
import ImgBackground from '../../assets/img/3807218.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 250px;
  padding: 3rem 6rem;

  background-image: url(${ImgBackground});
  background-repeat: cover;
  background-size: 100% 100vh;
  background-blend-mode: color-burn;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const ButtonAppbar = styled.button`
  text-decoration: none;
  border: none;
  background: transparent;

  font-size: 26px;
`;

export const useStyles = makeStyles(() =>
  createStyles({
    imageGPA: {
      width: '167px',
      height: '114px',
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    returnAppbar: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#7CC576',
    },
  }),
);
