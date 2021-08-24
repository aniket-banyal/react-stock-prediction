import ModelsCard from "./modelsCard"
import PredictionsCard from "./predictionsCard"


function Home() {
    console.log('home render')

    return (
        <div className="home">
            <ModelsCard />
            <PredictionsCard />
        </div>
    )

}


export default Home