import { Link } from "react-router-dom"

function HomePageCard({ title, link }) {
    console.log('HomePageCard render')

    return (
        <div className="card">
            <Link to={link}>
                <h1>{title}</h1>
            </Link>
        </div>
    )
}


export default HomePageCard