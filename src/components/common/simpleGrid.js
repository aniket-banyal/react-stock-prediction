// cant use map directly on children - https://reactjs.org/docs/react-api.html#reactchildren

import React from "react"
import Grid from '@material-ui/core/Grid'


function SimpleGrid({ children }) {
    // console.log('SimpleGrid render')

    return (
        <Grid container spacing={3}>
            {React.Children.map(children, (child) =>
                <Grid item xs={12} sm={6} md={4}>
                    {child}
                </Grid>
            )}
        </Grid>
    )
}

export default SimpleGrid