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

function Results(props: any) {
    const history = useHistory();
    const [tab, setTab] = useState(0)

    return (
        <ScreenTemplate>
            <Banner topText="Assessment Results" title="My Performance" footerValues={['35/50', '45%', '3']}/>
            <br/>
            <br/>
            <TabNavigation selectedIndex={tab} tabs={['Your Breakdown', 'View Answers']} callback={(index) => setTab(index)} />
            <div className="assessmentResultsPerformanceCardWrapper">
                <PerformanceCard
                    topText="DOMAIN - 01"
                    title="ICM Fundamentals"
                    bodyText="Mauris varius felis at commodo imperdiet. Cras faucibus egestas urna, sed cursus massa cursus in. apien interdum quis. Fusce id arcu eget nisl porta blandit. Etiam mollis massa et ipsum tincidunt, at luctus velit ultrices. Aliquam posuere mi ac risus scelerisque, in aliquam nunc molestie. Ut aliquam lobortis arcu, non "
                    questions="4 / 5"
                    percentage="78"/>
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