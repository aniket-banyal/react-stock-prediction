import { Link } from "react-router-dom"

function ModelsCard() {
    console.log('ModelsCard render')

    return (
        <div className="card">
            <Link to='/models'>
                <h1>Models Card</h1>
            </Link>
        </div>
    )
}


export default ModelsCard