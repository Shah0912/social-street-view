import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://st2.depositphotos.com/5000011/8188/v/950/depositphotos_81880318-stock-illustration-vector-greyscale-city-map-pattern.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#646464',
    /* theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900], */
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Landing() {
  const url =
    'https://res.cloudinary.com/dw2ejcbvt/image/upload/v1607433192/logo1_xctydd.png'
  const classes = useStyles()
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            <img className="test" src={url} alt="test" />
          </Typography>
          <Button
            color="secondary"
            className={classes.submit}
            onClick={() => {
              loginWithRedirect()
              // MergeUser({variables:{name: user.name, email: user.email}});

              // createUser({ variables: { name: user.value, email: user.email, $profileImg: user.picture} });
              // console.log(user);
            }}
          >
            <Typography component="h1" variant="h5">
              Log-in
            </Typography>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}
