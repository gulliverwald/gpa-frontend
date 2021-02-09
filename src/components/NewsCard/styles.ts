import { createStyles, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  border-bottom: 1px solid #c4c4c4;
  padding: 23px;

  img {
    width: '89px';
    height: '89px';
    object-fit: 'fill';
    padding-left: '8px';
    object-position: 'center';
  }
`;

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 14px;

  p {
    padding-top: 8px;
    color: #6e6e6e;
  }
`;

export const useStyles = makeStyles(() =>
  createStyles({
    linkContainer: {
      textDecoration: 'none',
      display: 'flex',
      width: '90%',
      color: '#3FB978',

      '&:after': {
        color: '#3D8B4E',
      },
    },
  }),
);
