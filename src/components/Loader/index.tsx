import React, {useState} from 'react';
import './styles.css';
import Banner from "../Banner";
import CircularProgress from "../CircularProgress";
import container from '../../assets/images/progressContainer.png'

interface ILoader {

}

const Loader: React.FC<ILoader> = ({

                                   }) => {
    return (
        <div className="centerLoader">
            <div style={{marginTop: 40}}>
                <Banner topText="THE TOURNAMENT ASSESSMENT" title="Your Assessment is Being Processed"/>
                <div className="centerLoader">
                    <img src={container} width={250} height={250}/>
                    <div className="loaderCircularProgressWrapper">
                        <CircularProgress type="fill" values={[0, 100]} text=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;