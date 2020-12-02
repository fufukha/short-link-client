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
  const [shortUrlData, setShortUrlData] = useState();
  const [alias, setAlias] = useState("")
  const [urlName, setUrlName] = useState('')
  const [isError, setIsError] = useState(false)

  const [createLink, { loading, error }] = useMutation(CREATE_LINK, {
    onCompleted: ({ createLink }) => {
      setShortUrlData({
        url: `http://short-links/${createLink.slug}`,
        name: createLink.name
      })

    }
  })

  const handleClick = () => {
    if(!url) {
      setIsError(true)
    } else {
      setIsError(false)
      createLink({
        variables: { url, name: urlName, slug: alias }
      })
      setUrl('')
      setAlias('')
      setUrlName('')
    }
  }

  const handleChange = (e, type) => {
    if(type === 'url') setUrl(e.target.value);
    if(type === 'alias') setAlias(e.target.value);
    if(type === 'urlName') setUrlName(e.target.value)
  }

  const shortUrlCard = useRef(null)

  useEffect(() => {
    if(shortUrlData && shortUrlCard.current) {
      shortUrlCard.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  })

  const classes = useStyles()
  const urlLabel = 'Place URL here'
  const slugLabel = 'Place custom alias here'
  const nameLabel= 'Name your URL'

  return (
    <>
      <form autoComplete="off">
        <Grid container justify="space-around" spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              error={isError}
              data-testid={isError}
              fullWidth
              type="text"
              required
              label="Required"
              placeholder="Place URL here"
              inputProps={{ label: urlLabel, 'aria-label': urlLabel}}
              InputLabelProps={{shrink: true}}
              value={url}
              onChange={e => handleChange(e, 'url')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              fullWidth
              type="text"
              required={false}
              label="Custom URL alias (optional)"
              placeholder="Place alias here"
              inputProps={{ label: slugLabel, 'aria-label': slugLabel}}
              InputLabelProps={{shrink: true}}
              value={alias}
              onChange={e => handleChange(e, 'alias')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              fullWidth
              type="text"
              required={false}
              label="Name (optional)"
              placeholder="Name your URL"
              inputProps={{ label: nameLabel, 'aria-label': nameLabel}}
              InputLabelProps={{shrink: true}}
              value={urlName}
              onChange={e => handleChange(e, 'urlName')}
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
        </Grid>
      </form>
      {error && <p>error.message</p>}
      {loading && (
        <Box className={classes.loader}>
          <CircularProgress color="primary"/>
        </Box>

      )}
      {shortUrlData && (
        <Box className={classes.copyContent} ref={shortUrlCard}>
          <CopyButton url={shortUrlData.url} name={shortUrlData.name} />
        </Box>
      )}
    </>
  );
};

export default UrlShortener;
