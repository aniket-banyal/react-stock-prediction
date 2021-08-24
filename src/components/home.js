import HomePageCard from "./common/homePageCard"

function Home() {
    console.log('home render')

    return (
        <div className="home">
            <HomePageCard title='Models' link='/models' />
            <HomePageCard title='Predictions' link='/predictions' />
        </div>
    )
}


export default Home