import AppHead from "../../appHead/AppHead";
import AppHeader from "../../appHeader/AppHeader"
import AppPopular from "../../appPopular/AppPopular";
import AppBlackBlock from "../../appBlackBlock/AppBlackBlock";
import AppEco from "../../appEco/AppEco";
import AppInst from "../../appInst/AppInst";
import AppFooter from "../../appFooter/AppFooter";


const MainPage = ({ carts, slides }) => {

    return (
        <>
            <AppHeader carts={carts} slides={slides} />
            <AppHead slides={slides} />
            <AppPopular slides={slides} />
            <AppBlackBlock />
            <AppEco />
            <AppInst />
            <AppFooter />
        </>
    )
}

export default MainPage;