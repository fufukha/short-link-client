import React, { useState } from "react";
import {
  Button,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto',
    padding: '20px 0',
  },
  link: {
    color: 'black',
  },
  name: {
    marginBottom: 20,
    width: '100%',
    alignSelf: 'stretch',
  },
  actions: {
    alignSelf: 'flex-end',
  },
}))

const CopyButton = ({ url, name }) => {
  const [ isDisabled, setIsDisabled ] = useState(false)

  const handleClick = async () => {
    if (!navigator.clipboard) {
      setIsDisabled(true)
      return
    }
    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {
      console.error('Failed to copy!', err)
      setIsDisabled(true)
    }
  }

  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        {name && (
          <Typography component='h3' variant="h6" className={classes.name}>
            {name}
          </Typography>
        )}
        <Typography component="span" variant="body1">
          <Link className={classes.link} data-testid="shortLinkAddress" styles={{color: 'black'}}>
            {url}
          </Link>
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="text"
          disabled={isDisabled}
          onClick={handleClick}
        >
          Copy
        </Button>
      </CardActions>
    </Card>
  );
};

export default CopyButton;
