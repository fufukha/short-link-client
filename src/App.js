import React from "react";
import "./styles.css";
import UrlShortener from "./components/UrlShortener";
import { Typography, Container, Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  main: {
    padding: 0,
    margin: 0,
  },
  hero: {
    backgroundColor: theme.palette.primary.main,
    padding: '50px 0 100px',
  },
  title: {
    fontSize: '70px',
    fontWeight: 500,
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 500,
  },
  content: {
    padding: '50px 0'
  }
}))


export default function App() {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Box component='main' height='100%' className={classes.main}>
        <Box component='section' className={classes.hero}>
          <Container color='primary' maxWidth='md'>
            <Typography variant='h1' className={classes.title}>
              snipper
            </Typography>
            <Typography variant='h2' className={classes.subtitle}>
              {'a URL shortener tool for branding'}
            </Typography>
          </Container>
        </Box>
        <Container component='section' maxWidth='xs' className={classes.content}>
          <UrlShortener />
        </Container>
      </Box>
    </>
  );
}
