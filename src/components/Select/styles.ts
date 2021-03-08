import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    width: '90%',
    height: '100%',
    margin: theme.spacing(1),
    minWidth: '120',
    maxWidth: '200',
  },

}));
