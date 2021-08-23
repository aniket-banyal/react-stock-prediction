import ModelCard from "./modelCard"
import PredictionCard from "./predictionCard"


function Home() {
    console.log('home render')

    return (
        <div className="home">
            <ModelCard />
            <PredictionCard />
        </div>
    )

}


export default Home