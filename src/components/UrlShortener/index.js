import React, { useState } from "react";
import { useMutation } from '@apollo/client'
import { CREATE_LINK } from "../../models/api";
import CopyButton from "../CopyButton";
import {
  Button,
  TextField,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root fieldset': {
      borderWidth: '2px',
    }
  },
  button: {
    height: '52px',
  },
  copyContent: {
    margin: '20px auto',
    width: '100%',
  },
  copyContent: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px auto',
    width: '100%',
  },
}))

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [createLink, { loading, error }] = useMutation(CREATE_LINK, {
    onCompleted: ({ createLink }) => {
      setShortUrl(`http://short-links/${createLink.slug}`)
    }
  })

  const handleClick = () => {
    createLink({
      variables: { url, name: '' }
    })
    setUrl('')
  }

  const handleChange = e => setUrl(e.target.value);

  const classes = useStyles()
  const inputProps = {
      label: 'Place URL here',
      'aria-label': 'Place URL here'
    }

  return (
    <Grid container justify="space-around" spacing={1}>
      <Grid item xs={12}>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          type="text"
          required
          label="Place URL here"
          placeholder="Place URL here"
          inputProps={inputProps}
          value={url}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.button}
          variant="contained"
          fullWidth
          size="large"
          color="primary"
          onClick={handleClick}>
          Shorten
        </Button>
      </Grid>
      {error && <p>error.message</p>}
      {loading && (
        <Box className={classes.contentLoader}>
          <CircularProgress color="primary"/>
        </Box>

      )}
      {shortUrl && (
        <Box className={classes.copyContent}>
          <CopyButton text={shortUrl} />
        </Box>
      )}
    </Grid>
  );
};

export default UrlShortener;
