import {
  createStyles, lighten, makeStyles, Theme,
} from '@material-ui/core';

export const useToolbarStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  container: {
    minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
}));
