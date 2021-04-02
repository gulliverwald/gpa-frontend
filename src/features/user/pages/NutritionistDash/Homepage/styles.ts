import { makeStyles, createStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 90%;

  h1 {
    padding-top: 30px;
    font-size: 5rem;
    span {
      font-size: 5.5rem;
      color: #FF2131;
    }
  }
`;

export const useStyles = makeStyles(() => createStyles({}));
