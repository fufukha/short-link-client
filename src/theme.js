import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[600],
    }
  }
});

export default theme;
