import styled from 'styled-components';
import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 30px 0px;
  }

  h1 {
    font-weight: bold;
  }

  .line {
    padding: 20px 0px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .new-meal {
    padding: 20px 0px;
    button {
      display: flex;
      align-items: center;
      border: 0;
      padding-left: 30px;

      span {
        padding-left: 20px;
      }
    }
    button:hover {
      color: gray;
    }
  }
`;

export const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    width: '70%',
    padding: '20px',
  },
  accordion: {
    width: '100%',
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
  input: {
    width: '100%',
    margin: '16px 0px',
  },
  modalContainer: {
    display: 'flex',
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  modalCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    border: 'none',
    padding: '2%',
    height: 'auto',
    maxWidth: '50%',
    width: 'auto',
  },
  inputForm: {
    margin: '0',
    width: '100%',
  },
  inputFormBody: {
    width: '100%',
  },
  button: {
    margin: '8px',
  },
  buttonCardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}));
