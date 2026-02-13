import AppHead from "../../appHead/AppHead";
import AppHeader from "../../appHeader/AppHeader"
import AppPopular from "../../appPopular/AppPopular";
import AppBlackBlock from "../../appBlackBlock/AppBlackBlock";
import AppEco from "../../appEco/AppEco";
import AppInst from "../../appInst/AppInst";
import AppFooter from "../../appFooter/AppFooter";
import AppSubscribtion from "../../appSubscribtion/AppSubscribtion";



const MainPage = ({ carts, slides, handleCardClick, loading, error }) => {

    return (
        <>
            <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            <AppHead  slides={slides}  loading={loading} error={error}/>
            <AppPopular  slides={slides} handleCardClick={handleCardClick}  loading={loading} error={error}/>
            <AppBlackBlock />
            <AppEco />
            <AppInst />
            <AppSubscribtion />
            <AppFooter />
        </>
    )
}

export default MainPage;