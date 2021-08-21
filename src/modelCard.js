import { Link } from "react-router-dom"

function ModelCard() {
    console.log('modelcard render')

    return (
        <div className="card">
            <Link to='/models'>
                <h1>Models Card</h1>
            </Link>
        </div>
    )

}


export default ModelCard