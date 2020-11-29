import React, { useState, useRef, useEffect } from "react";
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px auto',
    width: '100%',
  },
}))

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [alias, setAlias] = useState("")

  const [createLink, { loading, error }] = useMutation(CREATE_LINK, {
    onCompleted: ({ createLink }) => {
      setShortUrl(`http://short-links/${createLink.slug}`)
    }
  })

  const handleClick = () => {
    createLink({
      variables: { url, name: '', slug: alias }
    })
    setUrl('')
    setAlias('')
  }

  const handleUrl = e => setUrl(e.target.value);
  const handleAlias = e => setAlias(e.target.value);

  const urlCard = useRef(null)

  useEffect(() => {
    if(shortUrl && urlCard.current) {
      urlCard.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  })

  const classes = useStyles()
  const urlProps = {
    label: 'Place URL here',
    'aria-label': 'Place URL here',
  }

  const slugProps = {
    label: 'Place custom URL name',
    'aria-label': 'Place custom URL name',
  }

  return (
    <Grid container justify="space-around" spacing={3}>
      <Grid item xs={12}>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          type="text"
          required
          label="Required"
          placeholder="Place URL here"
          inputProps={urlProps}
          InputLabelProps={{shrink: true}}
          value={url}
          onChange={handleUrl}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          type="text"
          required={false}
          label="Custom alias (optional)"
          placeholder="Place alias here"
          inputProps={slugProps}
          InputLabelProps={{shrink: true}}
          value={alias}
          onChange={handleAlias}
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
        <Box className={classes.loader}>
          <CircularProgress color="primary"/>
        </Box>

      )}
      {shortUrl && (
        <Box className={classes.copyContent} ref={urlCard}>
          <CopyButton text={shortUrl} />
        </Box>
      )}
    </Grid>
  );
};

export default UrlShortener;
