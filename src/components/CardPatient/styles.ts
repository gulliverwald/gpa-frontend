import { createStyles, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: white;

  &:active{
    background-color: #EEEEEE;
  }

  b {
    padding: 8px;
    color: #3FB978;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 62px;
  min-width: 376px;
  min-height: 62px;
  margin: 16px;
  text-decoration: none;
  border: none;
  background: transparent;

  &:active{
    transform: translateY(4px);
    transition: transform 50ms ease-in-out;
  }

  @media (max-width: 900px) {
    min-width: unset;
    width: 80%;
  }
`;

export const useStyles = makeStyles(() => createStyles({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '100%',
    backgroundColor: '#3FB978',
    borderRadius: '5px',
  },
}));
