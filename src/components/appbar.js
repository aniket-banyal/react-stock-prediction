import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component={RouterLink} to="/" sx={{ flexGrow: 1 }} color='inherit'>
                        Home
                    </Typography>
                    <Button href='https://github.com/dummy26/react-stock-prediction'>Github</Button>
                </Toolbar>
            </AppBar>
        </Box >
    )
}
