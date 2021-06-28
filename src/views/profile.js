import React from 'react';

import {
  useAuth0,
  withAuthenticationRequired,
} from '@auth0/auth0-react';
import {
  Container,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'


import Loading from './loading';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#DBCFC5'

  },
  media: {
    height: 140,

  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),

  },
}));

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  console.log(user.name);
  const classes = useStyles();

  return (
    <Grid container maxWidth='sm' justify="center"  >
      <Grid item xs={6}>
        <Card className={classes.root}>
          <Avatar alt={user.nickname} src={picture} className={classes.large} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {user.nickname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Email: {email}
            </Typography>
          </CardContent>

        </Card>
      </Grid>

    </Grid>

  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});