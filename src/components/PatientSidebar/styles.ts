import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core';

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40%;
  height: 100%;
  background-color: #F4F4F4;
  padding-top: 40px;

  @media(max-width: 900px){
    background-color: transparent;
    padding-top: 0;
    height: unset;
    width: 100%;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 30%;
  padding: 40px;

  p {
    padding-left: 16px;
  }

  @media (max-width: 900px) {
    padding: 20px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  height: 100%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const OptionsItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 16px 0px;
  text-decoration: none;
  border: none;
  background: transparent;
`;

export const useStyles = makeStyles(() => createStyles({
  imageGPA: {
    width: '167px',
    height: '114px',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
    fontSize: '26px',
    color: '#3CB878',
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
}));
