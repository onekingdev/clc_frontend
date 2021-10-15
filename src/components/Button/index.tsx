import React, {useEffect, useState} from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icon from '@fortawesome/free-solid-svg-icons'
import SubtitleText from '../SubtitleText';
import PulseLoader from 'react-spinners/PulseLoader';
import { useIntercom } from "react-use-intercom";

interface IButton {
    transparent?: boolean,
    circular?: boolean,
    rotation?: number,
    iconName?: string,
    iconSize?: string,
    text?: string,
    onClick: () => void,
    width: string | number,
    height: string | number,
    selected?: boolean,
    image?: string,
    glow?: boolean,
    imgType?: string,
    closeMenuButton?: boolean,
    closeMenuButtonRight?: boolean,
    answer?: string,
    loading?: boolean,
    disabled?: boolean,
    fontSize?: string
}

const Button: React.FC<IButton> = ({
    transparent,
    circular,
    rotation,
    iconName,
    iconSize,
    text,
    onClick,
    width,
    height,
    selected,
    image,
    glow,
    imgType,
    closeMenuButton,
    closeMenuButtonRight,
    answer,
    loading,
    disabled,
    fontSize
                                   }) =>  {
    const [count, setCount] = useState(0);
    const { trackEvent } = useIntercom();
    const [spanStyles, setSpanStyles] = useState({});
    const [textColor, setTextColor] = useState(glow || transparent ? 'var(--button-solid-text)' : 'var(--button-simple-text)');
    const handleTrackEvent = () => trackEvent(window.location.pathname.toString());
    useEffect(() => {
        if (!selected && !glow && !closeMenuButton && !closeMenuButtonRight && !transparent) {
            setTextColor('var(--button-simple-text)');
        } else {
            setTextColor('var(--button-solid-text)');

        }
    }, [selected, glow, closeMenuButton, closeMenuButtonRight])

    /* Debounce Code to call the Ripple removing function */
    const callCleanUp = (cleanup: () => void, delay: number) => {
        return () => {
            let bounce = setTimeout(() => {
                cleanup();
            }, delay);
            clearTimeout(bounce);
        }
    }

    const showRipple = (e: {pageX: number, pageY: number, currentTarget: any}) => {
        const rippleContainer = e.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = e.pageX - pos.x - (size / 2);
        const y = e.pageY - pos.y - (size / 2);

        const s = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        const c = count + 1;

        setSpanStyles({...spanStyles, [c] : s});
        setCount(c);
    }

    const cleanUp = () => {
        setCount(0);
        setSpanStyles({});
    }

    const renderRippleSpan = () => {
        const spanArray = Object.keys(spanStyles);
        if (spanArray && spanArray.length > 0) {
            return (
                spanArray.map((key, index) => {
                    // @ts-ignore
                    return <span key={'spanCount_' + index} className="" style={{...spanStyles[key]}}/>
                })
            )
        } else {
            return null;
        }
    }

    return (
        <div
            className={disabled ? 'buttonDisabledContainer' : glow ? 'ripple buttonGlowingContainer' : 'ripple buttonContainer'}
            style={selected ? {
                    borderTopLeftRadius: circular ? 100 : closeMenuButton ? 0 : 8,
                    borderTopRightRadius: circular ? 100 : closeMenuButtonRight ? 0 : 8,
                    borderBottomLeftRadius: circular ? 100 : closeMenuButton ? 0 : 8,
                    borderBottomRightRadius: circular ? 100 : closeMenuButtonRight ? 0 : 8,
                    background: transparent ? 'transparent' : '',
                    width: width,
                    height: height,
                    backgroundColor: !transparent ?  'var(--primary)' : 'transparent',
                    justifyContent: answer ? 'flex-start' : 'center'
                    
                } :
                {
                    borderTopLeftRadius: circular ? 100 : closeMenuButton ? 0 : 8,
                    borderTopRightRadius: circular ? 100 : closeMenuButtonRight ? 0 : 8,
                    borderBottomLeftRadius: circular ? 100 : closeMenuButton ? 0 : 8,
                    borderBottomRightRadius: circular ? 100 : closeMenuButtonRight ? 0 : 8,
                    background: transparent ? 'transparent' : '',
                    width: width,
                    height: height,
                    justifyContent: answer ? 'flex-start' : 'center'
                    
                }}
            onClick={() => {
                if(disabled){
                    return
                }
                else{
                    onClick()
                    handleTrackEvent();
                }
            }}
            onMouseOver={() => {
                if (!disabled && !selected && !glow && !closeMenuButton && !closeMenuButtonRight && !transparent) {
                    setTextColor('var(--button-solid-text)')
                }
            }}
            onMouseLeave={() => {
                if (!disabled && !selected && !glow && !closeMenuButton && !closeMenuButtonRight && !transparent) {
                    setTextColor('var(--button-simple-text)')
                }
            }}
        >
            {loading ?
                <PulseLoader loading={true} color={textColor}/>
                :
                <div>
                    {iconName ?
                        <FontAwesomeIcon
                            color={selected && transparent ? 'var(--primary)' : textColor}
                            // @ts-ignore
                            size={iconSize}
                            // @ts-ignore
                            icon={Icon[iconName]}
                            transform={{rotate: rotation}}/> : null}
                    {answer ? <SubtitleText bold={true} color="#B5B3AE" marginLeft={16}
                                            marginRight={7} fontSize={fontSize}>{answer}</SubtitleText> : null}
                    <SubtitleText bold={true} color={textColor} fontSize={fontSize}>{text}</SubtitleText>
                    {image ? <img src={require(image)} width={imgType === 'phone' ? 50 : 90}
                                  height={imgType === 'phone' ? 90 : 50} style={{borderRadius: 5}} alt="image"/> : null}
                    <div className="rippleContainer" onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 2000)}>
                        {renderRippleSpan()}
                    </div>
                </div>
            }
        </div>
    );
}

export default Button;
