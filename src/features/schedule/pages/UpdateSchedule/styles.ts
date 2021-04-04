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
    margin: 0 5% 5%;
    width: 100%;
    display: flex;
    align-items: flex-start;

      .schedule-container {
        width: 45% !important;
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
      display: flex;
      align-items: center;
      justify-content: flex-start;
      span {
        padding: 0 8px;
        display: flex;
        align-items: center;
      }
    }
  }

  .pa-link {
    text-decoration: none;
    margin-top: 50px;
    background-color: #0D954B;
    width: 80%;
    border-radius: 5px;
    border: none;
    padding: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all ease 0.3s;

    span {
      font-weight: bold;
    }

    &:hover {
      -webkit-box-shadow: 2px 8px 25px 5px rgba(0,0,0,0.47);
      box-shadow: 2px 8px 25px 5px rgba(0,0,0,0.47);
    }
  }
  .grow {
    flex-grow: 1;
  }

  .antropometric-container {
    width: 45%;
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
