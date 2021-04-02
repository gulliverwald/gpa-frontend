import styled from 'styled-components';
import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h1 {
    margin: 20px 0px;
  }

  .container {
    padding: 20px 0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .content-container {
    margin: 0 5%;
    width: 100%;
    display: flex;
    align-items: center;

      .schedule-container {
        h2 {
          width: fit-content;
          border-bottom: solid 1px grey;
          padding: 10px 0;
          margin: 20px 0;
        }
      }
  }

  .list {
    .list-item {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        padding: 0 8px;
        font-weight: bold;

      }
    }
  }

  .pa-link {
    text-decoration: none;
    margin-top: 50px;
    background-color: #0D954B;
    width: 80%;
    border-radius: 5px;
    padding: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-weight: bold;
    }
  }

  .antropometric-container {
    width: 40%;
    padding: 0 50px;

    h2 {
      text-align: center;
      color: #2196F3;
      border-bottom: solid 1px #2196F3;
    }
  }
`;

export const useStyles = makeStyles((theme: Theme) => createStyles({
  observation: {
    width: '100%',
  },
  inputHuge: {
    width: '100%',
  },
}));
