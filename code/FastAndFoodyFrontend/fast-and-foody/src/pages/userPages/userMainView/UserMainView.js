import "./UserMainView.css"
import LayoutUserMainView from "../../components/usersComponents/LayoutUserMainView/LayoutUserMainView";
import section_one from "../../images/block1.png"
import section_two from "../../images/block2.png"

export default function UserMainView() {
    return (
        <LayoutUserMainView>
            <div className="userMainView-container">
                <div className="userMainView-container-sectionFirst">
                    <div className="userMainView-container-sectionFirst-info">
                        <div className="userMainView-container-sectionFirst-info-title">
                            <p className="userMainView-container-sectionFirst-info-title-text">Unusually
                                different.</p>
                            <p className="userMainView-container-sectionFirst-info-title-text">Legendary
                                as always.</p>
                        </div>

                        <div className="userMainView-container-sectionFirst-info-paragraph">
                            <p className="userMainView-container-sectionFirst-info-paragraph-text">
                                The legendary Big Mac® is visited by the big family: the crispy chicken
                                Big Mac® and the hearty Big Mac® with bacon . Both are a little different,
                                but that makes them no less legendary! Don't worry, the original Big Mac®
                                is still available, of course. The decision gets a little more complicated
                                😉 PS: By the way, the Big Mac® flavour is now briefly available in sauce
                                form too - for dipping, sprinkling and melting.
                            </p>
                        </div>

                        <div className="userMainView-container-sectionFirst-info-button-block">
                            <button className="userMainView-container-sectionFirst-info-button">
                                Try now</button>
                        </div>
                    </div>

                    <div className="userMainView-container-sectionFirst-imageBlock">
                        <img className="userMainView-container-sectionFirst-imageBlock-img" src={section_one}/>
                    </div>
                </div>

                <div className="userMainView-container-sectionSecond">
                    <div className="userMainView-container-sectionFirst-imageBlock">
                        <img className="userMainView-container-sectionFirst-imageBlock-img" src={section_two}/>
                    </div>

                    <div className="userMainView-container-sectionFirst-info">
                        <div className="userMainView-container-sectionFirst-info-title">
                            <p className="userMainView-container-sectionFirst-info-title-text">Unusually
                                different.</p>
                            <p className="userMainView-container-sectionFirst-info-title-text">Legendary
                                as always.</p>
                        </div>

                        <div className="userMainView-container-sectionFirst-info-paragraph">
                            <p className="userMainView-container-sectionFirst-info-paragraph-text">
                                The legendary Big Mac® is visited by the big family: the crispy chicken
                                Big Mac® and the hearty Big Mac® with bacon . Both are a little different,
                                but that makes them no less legendary! Don't worry, the original Big Mac®
                                is still available, of course. The decision gets a little more complicated
                                😉 PS: By the way, the Big Mac® flavour is now briefly available in sauce
                                form too - for dipping, sprinkling and melting.
                            </p>
                        </div>

                        <div className="userMainView-container-sectionFirst-info-button-block">
                            <button className="userMainView-container-sectionFirst-info-button">
                                Try now</button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUserMainView>
    )
}