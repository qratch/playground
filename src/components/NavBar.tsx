import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'

/**
 * NavBar props.
 */
export type NavBarProps = {
  onRunClicked(): void
}

/**
 * NavBar component.
 */
export const NavBar: React.VFC<NavBarProps> = (props) => {
  return (
    <>
      <AppBar elevation={0} style={{ marginBottom: '64px' }}>
        <Toolbar>
          <Typography variant="h6">Qratch Playground</Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={props.onRunClicked}
            startIcon={<PlayArrow />}
          >
            Run
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
