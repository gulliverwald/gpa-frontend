import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  deleteConfirmationModal: {
    display: 'flex',
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  deleteConfirmationCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    padding: '16px',
    height: '30%',
    width: '30%',
  },
  alertText: {
    fontWeight: 600,
    marginTop: '20%',
  },
  buttonCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    margin: '8px',
  },
}));
