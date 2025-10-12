import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";

const HomePage = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">

                    <InPageNavigation routes={["Home", "Trending"]} defaultHidden={"Trending"}>

                        <h1>hi</h1>
                        <h2>gi</h2>

                    </InPageNavigation>

                </div>

                {/* filters and trending blogs */}
                <div>

                </div>
            </section>
        </AnimationWrapper>

    )
}

export default HomePage;