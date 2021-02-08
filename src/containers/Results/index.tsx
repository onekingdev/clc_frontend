import React, {useState, useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import ScreenTemplate from "../ScreenTemplate";
import Button from "../../components/Button";
import Banner from "../../components/Banner";
import TabNavigation from "../../components/TabNavigation";
import PerformanceCard from "../../components/PerformanceCard";
import performanceBg from "../../assets/images/performanceBg.png";
import ProgressCard from "../../components/ProgressCard";

function Results(props: any) {
    const history = useHistory();
    const [tab, setTab] = useState(0)

    return (
        <ScreenTemplate>
            <Banner topText="THE TOURNAMENT ASSESSMENT" title="Assessment Results" footerValues={['35/50', '45%', '3']}/>
            <div className="pathsImageWrapper">
                <img src={performanceBg} width="90%"/>
            </div>
            <br/>
            <br/>
            <div className="assessmentResultsPerformanceCardWrapper">
                <PerformanceCard
                    topText="YOUR PERSONAL TRAINING PROGRAM"
                    title="“Pre-Flop Strategies”"
                    bodyText="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. apien interdum quis. Fusce id arcu eget nisl porta blandit. Etiam mollis massa et ipsum tincidunt, at luctus velit ultrices. Aliquam posuere mi ac risus scelerisque, in aliquam nunc molestie. Ut aliquam lobortis arcu, non "
                    questions="4 / 5"
                    percentage="78"/>
            </div>
            <TabNavigation selectedIndex={tab} tabs={['Your Stats']} callback={(index) => setTab(index)} />
            <div className="assessmentResultsPerformanceCardWrapper">
                <ProgressCard values={[0,10]} progressText="5/5" upperText="DOMAIN - 01" title="ICM Fundamentals" text="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. Capien interdum quis. Fusce id arcu eget nisl porta blandit. Etiam mollis massa et ipsum tincidunt, at luctus velit ultrices. Aliquam posuere mi ac risus scelerisque, in aliquam nunc molestie. Ut aliquam lobortis arcu, non consectetur sapien interdum quis."/>
            </div>
        </ScreenTemplate>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
    };
}

const bindActions = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, bindActions)(Results);