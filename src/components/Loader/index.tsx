import React, {useState} from 'react';
import './styles.css';
import Banner from "../Banner";
import CircularProgress from "../CircularProgress";
import container from '../../assets/images/progressContainer.png'

interface ILoader {
    type: string,
    topText: string,
    title: string
}

const Loader: React.FC<ILoader> = ({
    type,
    topText,
    title
                                   }) => {
    return (
        <div className="centerLoader">
            <div style={{marginTop: 40}}>
                <Banner topText={topText} title={title}/>
                <div className="centerLoader">
                    <img src={container} width={250} height={250}/>
                    <div className="loaderCircularProgressWrapper">
                        <CircularProgress duration={type === 'ai' ? 2.8 : 1.4} type="fill" values={[0, 100]} text=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;