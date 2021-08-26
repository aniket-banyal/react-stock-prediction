import HomePageCard from "./common/homePageCard"

function Home() {
    console.log('home render')

    return (
        <div className="home">
            <HomePageCard title='Models' link='/models' />
        </div>
    )
}


export default Home