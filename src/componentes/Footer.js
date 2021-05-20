import React from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '60vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:'#20603d',
    color:'#ffffff',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" style={{textAlign: 'center'}}> © CatSoft 2021</Typography>
        </Container>
      </footer>
    </div>
  );
}