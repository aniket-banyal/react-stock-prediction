// cant use map directly on children - https://reactjs.org/docs/react-api.html#reactchildren

import React from "react"
import ListItem from "./listItem"

function List({ children }) {
    console.log('List render')

    return (
        <div className='list'>
            {React.Children.map(children, (child) => <ListItem item={child} />)}
        </div>
    )
}

export default List