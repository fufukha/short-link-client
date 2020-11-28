import React, { useState } from "react";
import { createLink } from "../../models/api-mock";
import CopyButton from "../CopyButton";
import {
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root fieldset': {
      borderWidth: '2px',
    }
  }
}))



const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleClick = (e) => {
    createLink(url).then(({ shortUrl }) => setShortUrl(shortUrl));
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

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
          variant="contained"
          fullWidth
          size="large"
          color="primary"
          onClick={handleClick}>
          Shorten
        </Button>
      </Grid>
      {shortUrl && (
        <>
          <div>{shortUrl}</div>
          <CopyButton text={shortUrl} />
        </>
      )}
    </Grid>
  );
};

export default UrlShortener;
