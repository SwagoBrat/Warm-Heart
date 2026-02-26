import AppHead from "../../appHead/AppHead";
import AppHeader from "../../appHeader/AppHeader"
import AppPopular from "../../appPopular/AppPopular";
import AppBlackBlock from "../../appBlackBlock/AppBlackBlock";
import AppEco from "../../appEco/AppEco";
import AppInst from "../../appInst/AppInst";
import AppFooter from "../../appFooter/AppFooter";
import AppSubscribtion from "../../appSubscribtion/AppSubscribtion";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";



const MainPage = ({ carts, slides, handleCardClick, loading, error }) => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Plaids market place"
                />
                <title>Plaids market place</title>
            </Helmet >
            <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            <ErrorBoundary>
                <AppHead slides={slides} loading={loading} error={error} />
            </ErrorBoundary>
            <ErrorBoundary>
                <AppPopular slides={slides} handleCardClick={handleCardClick} loading={loading} error={error} />
            </ErrorBoundary>
            <AppBlackBlock />
            <AppEco />
            <AppInst />
            <ErrorBoundary>
                <AppSubscribtion />
            </ErrorBoundary>
            <AppFooter />
        </>
    )
}

export default MainPage;