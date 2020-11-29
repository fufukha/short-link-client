import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
  const [, setIsCopied] = useState(false);
  console.log('name', name)

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
          <Link className={classes.link} styles={{color: 'black'}}>
            {url}
          </Link>
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
          <Button
            variant="text"
          >
            Copy
          </Button>
        </CopyToClipboard>
      </CardActions>
    </Card>
  );
};

export default CopyButton;
