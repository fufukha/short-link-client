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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 auto',
    padding: '20px 0',
  },
  link: {
    color: 'black',
  },
}))

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography component="span" fullWidth variant="body1">
          <Link className={classes.link} styles={{color: 'black'}}>
            {text}
          </Link>
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <CopyToClipboard text={text} onCopy={() => setIsCopied(true)}>
          <Button
            color="#000000"
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
