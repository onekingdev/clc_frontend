import React, {useEffect, useState} from 'react';
import './styles.css';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// @ts-ignore
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from './AnimatedProgressProvider';
import ChangingProgressProvider from './ChangingProgressProvider';
import BodyText from "../BodyText";
import TitleText from "../TitleText";

interface ICircularProgress {
    type: string // default, speedometer, pie, fill
    values: number[],
    text: string
}

const CircularProgress: React.FC<ICircularProgress> = ({
    type,
    values,
    text
}) =>  {

    const renderType = (progressType: string) => {
        switch (progressType) {
            case 'fill':
                return (
                    <AnimatedProgressProvider
                        valueStart={values[0]}
                        valueEnd={values[1]}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                    >
                        {(data: any) => {
                            const roundedValue = Math.round(data);
                            return (
                                <CircularProgressbar
                                    value={data}
                                    strokeWidth={2}
                                    text={`${roundedValue}${text}`}
                                    background
                                    styles={buildStyles({
                                        pathTransition: "none",
                                        backgroundColor: "#000",
                                        textColor: "#fff",
                                        pathColor: "var(--primary)",
                                        trailColor: "transparent"
                                    })}
                                />
                            );
                        }}
                    </AnimatedProgressProvider>
                );
            default:
                return (
                    <AnimatedProgressProvider
                        valueStart={values[0]}
                        valueEnd={values[1]}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                    >
                        {(data: any) => {
                            return (
                                <div>
                                    <CircularProgressbar
                                        value={data}
                                        strokeWidth={4}
                                        background={true}
                                        /* This is important to include, because if you're fully managing the
                                  animation yourself, you'll want to disable the CSS animation. */
                                        styles={buildStyles({
                                            pathTransition: "none",
                                            trailColor: "#000",
                                            textColor: "#000",
                                            backgroundColor: "#000",
                                            pathColor: renderPathColorDependingOnProgress(values[1]),
                                        })}
                                    />
                                    <div style={{marginTop: -70, marginLeft: parseInt(text.split('/')[0]) > 99 ? 15 : parseInt(text.split('/')[0]) > 9 ? 25 : 35}}>
                                        <TitleText color="#FFF" bold>{text.split('/')[0]}</TitleText>
                                        <BodyText>{`/${text.split('/')[1]}`}</BodyText>
                                    </div>
                                </div>
                            );
                        }}
                    </AnimatedProgressProvider>
                );
        }
    }

    const renderPathColorDependingOnProgress = (progress: number) => {
        if (progress < 25) {
            return '#C75350'
        } else if (progress < 65) {
            return '#BF881D'
        }
        return '#759A47'
    }

    return (
        <div>
            {renderType(type)}
        </div>
    );
}

export default CircularProgress;
