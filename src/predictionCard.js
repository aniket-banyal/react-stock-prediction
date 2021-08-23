import { Link } from "react-router-dom"

function PredictionCard() {
    console.log('PredictionCard render')

    return (
        <div className="card">
            <Link to='/predictions'>
                <h1>Predictions Card</h1>
            </Link>
        </div>
    )
}


export default PredictionCard