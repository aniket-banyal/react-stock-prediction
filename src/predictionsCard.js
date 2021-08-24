import { Link } from "react-router-dom"

function PredictionsCard() {
    console.log('PredictionsCard render')

    return (
        <div className="card">
            <Link to='/predictions'>
                <h1>Predictions Card</h1>
            </Link>
        </div>
    )
}


export default PredictionsCard