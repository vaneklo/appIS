import React from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}></Typography>
                        <Button color="inherit" component={Link} to="/" >Inicio</Button>
                        <Button color="inherit" component={Link} to="/registrar" >Recetas</Button>
                        <Button color="inherit" component={Link} to="/prevRecetas" >prev</Button>
                    </Toolbar>
                </AppBar>
            </div>
    );
}
