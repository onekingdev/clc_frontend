import React, {useEffect, useState} from 'react';
import './styles.css';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// @ts-ignore
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from './AnimatedProgressProvider';
import ChangingProgressProvider from './ChangingProgressProvider';

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
            case 'speedometer':
                return (
                    <ChangingProgressProvider values={values}>
                        {(data: any) => (
                            <CircularProgressbar
                                value={data}
                                text={`${data}${text}`}
                                circleRatio={0.75}
                                styles={buildStyles({
                                    rotation: 1 / 2 + 1 / 8,
                                    strokeLinecap: "butt",
                                    trailColor: "#eee",
                                    textColor: "var(--primary)",
                                    pathColor: "var(--primary)",
                                })}
                            />
                        )}
                    </ChangingProgressProvider>
                );
            case 'pie':
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
                                    text={`${roundedValue}${text}`}
                                    strokeWidth={50}
                                    styles={buildStyles({
                                        strokeLinecap: "butt",
                                        trailColor: "transparent",
                                        textColor: "#fff",
                                        pathColor: "var(--primary)"
                                    })}
                                />
                            );
                        }}
                    </AnimatedProgressProvider>
                );
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
                                    text={`${roundedValue}${text}`}
                                    background
                                    styles={buildStyles({
                                        pathTransition: "none",
                                        backgroundColor: "var(--primary)",
                                        textColor: "#fff",
                                        pathColor: "#fff",
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
                            // const roundedValue = Math.round(data);

                            return (
                                <CircularProgressbar
                                    value={data}
                                    text={`${text}`}
                                    /* This is important to include, because if you're fully managing the
                              animation yourself, you'll want to disable the CSS animation. */
                                    styles={buildStyles({
                                        pathTransition: "none",
                                        textColor: "var(--primary)",
                                        pathColor: "var(--primary)",
                                    })}
                                />
                            );
                        }}
                    </AnimatedProgressProvider>
                );
        }
    }

    return (
        <div>
            {renderType(type)}
        </div>
    );
}

export default CircularProgress;
