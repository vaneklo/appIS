import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



export default function Footer() {
    return (
        <AppBar position="static" color="primary" style={{marginTop:300, bottom: 0}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 CatSoft
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}