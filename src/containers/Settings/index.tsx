import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import * as ACTIONS from "../Settings/store/actions";
import * as AUTH_ACTIONS from "../Authentication/store/actions";
// @ts-ignore
import {useHistory} from 'react-router-dom';
import XLSX from 'xlsx';
import FilePicker from '../../components/FilePicker';
import Button from '../../components/Button';
import DotLoader from 'react-spinners/DotLoader';
import TitleText from "../../components/TitleText";
import Avatar from "../../components/Avatar";
import BodyText from "../../components/BodyText";
import ErrorDisplay from "../../components/ErrorDisplay";
import {
    libraryUploadError,
    questionsUploadError,
    glossaryUploadError,
    eventsUploadError,
    emptyEmailString, invalidEmailString, emptyPasswordString
} from "../../helpers/constants";
import Banner from "../../components/Banner";
import TextInput from "../../components/TextInput";
import {validateEmail} from "../../helpers/validations";
import ScreenTemplate from "../ScreenTemplate";
import {IUpdateUserData} from "./interfaces";

const host = new URL(window.location.href).host;

function Settings(props: any) {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailObj, setEmailObj] = useState({email: props.user.email, error: false});
    const [passwordObj, setPasswordObj] = useState({password: 'set your new password', error: false});
    const [showErrorMsg, setShowErrorMsg] = useState('');
    const [selected, setSelected] = useState(props.user.avatar);

    const inputRef = useRef(null);

    useEffect(() => {
        if (
            !emailObj.error &&
            !passwordObj.error
        ) {
            setShowErrorMsg('');
            props.settingsErrorMessage('');
        }
    }, [emailObj, passwordObj])

    useEffect(() => {
        if (props.errorMessage !== '') {
            setShowErrorMsg(props.errorMessage);
        }
    }, [props.errorMessage])

    const handleSubmit = () => {
        if (emailObj.email === '') {
            setEmailObj({email: emailObj.email, error: true});
            setShowErrorMsg(emptyEmailString);
        } else if (!validateEmail(emailObj.email)) {
            setEmailObj({email: emailObj.email, error: true});
            setShowErrorMsg(invalidEmailString);
        } else if (passwordObj.password === '') {
            setPasswordObj({password: passwordObj.password, error: true});
            setShowErrorMsg(emptyPasswordString);
        } else {
            const request = {
                email: emailObj.email,
                password: passwordObj.password,
                avatar: selected
            }

            props.updateUserData(request);
        }
    }


    function chooseFile() {
        const current = inputRef.current;
        (current || {
            click: () => {
            }
        }).click()
    }

    const onFileOpen = (data: any) => {
        const wb = XLSX.read(data, {type: 'binary'});
        var sheets: { [email: string]: Array<Object> | Object; } = {};

        for (var i = 0; i < wb.SheetNames.length; i++) {
            /* Get first worksheet */
            const wsname = wb.SheetNames[i];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            sheets[wsname] = data;
        }
        return sheets;
    }

    const importLibrary = (data: any) => {
        setErrorMessage('');
        const sheets = onFileOpen(data);
        bulkImportLibrary(sheets);
    }

    const importQuestions = (data: any) => {
        setErrorMessage('');
        const sheets = onFileOpen(data);
        bulkImportQuestions(sheets);
    }

    const importGlossary = (data: any) => {
        setErrorMessage('');
        const sheets = onFileOpen(data);
        bulkImportGlossary(sheets);
    }

    const importEvents = (data: any) => {
        setErrorMessage('');
        const sheets = onFileOpen(data);
        bulkImportEvents(sheets);
    }

    const bulkImportLibrary = (sheets: { [email: string]: Object; }) => {
        let library = (sheets["LIBRARIES"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    image: value['IMAGE'],
                    duration: value['DURATION'],
                    title: value['TITLE'],
                    description: value['DESCRIPTION'],
                    url: value['URL'],
                    type: value['TYPE'],
                    handBreakdown: value['HAND_BREAKDOWN'],
                }
            });
        if (library.length > 0) {
            props.uploadLibrary({library});
        } else {
            setErrorMessage(libraryUploadError);
        }
    }

    const bulkImportQuestions = (sheets: { [email: string]: Object; }) => {
        let lessons = (sheets["LESSONS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    UID: value['UID'],
                    topicUID: value['TOPIC_UID'],
                    name: value['NAME'],
                    description: value['DESCRIPTION'],
                    rule: value['RULE'].toString(),
                    order: parseInt(value['ORDER'])
                }
            });

        let topics = (sheets["TOPICS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    UID: value['UID'],
                    name: value['NAME'],
                    masteredLevel: value['MASTERED_LEVEL'],
                    chips: value['CHIPS'],
                    tickets: value['TICKETS']
                }
            });

        let questions = (sheets["QUESTIONS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    lessonUID: value['LESSON_UID'],
                    questionText: value['QUESTION_TEXT'],
                    answers: {
                        correct: value['ANSWER_CORRECT'],
                        wrong1: value['ANSWER_WRONG1'],
                        wrong2: value['ANSWER_WRONG2'],
                        wrong3: value['ANSWER_WRONG3'],
                        wrong4: value['ANSWER_WRONG4'],
                    },
                    explanation: {correct: value['EXPLANATION_CORRECT'], wrong: value['EXPLANATION_WRONG']},
                    handHistory: value['HAND_HISTORY'] ? value['HAND_HISTORY'] : '',
                    reward: {chips: value['REWARD_CHIPS'], tickets: value['REWARD_TICKETS']},
                    assessment: value['ASSESSMENT']
                }
            });

        if (lessons.length > 0 && questions.length > 0 && topics.length > 0) {
            props.uploadQuestions({lessons, questions, topics});
        } else {
            setErrorMessage(questionsUploadError);
        }
    }

    const bulkImportGlossary = (sheets: { [email: string]: Object; }) => {
        let glossary = (sheets["GLOSSARY"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    word: value['WORD'] ? value['WORD'] : '',
                    definition: value['DEFINITION'],
                }
            });
        if (glossary.length > 0) {
            props.uploadGlossary({glossary});
        } else {
            setErrorMessage(glossaryUploadError);
        }
    }

    const bulkImportEvents = (sheets: { [email: string]: Object; }) => {
        let events = (sheets["EVENTS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    title: value['TITLE'],
                    date: value['DATE'],
                    body: value['BODY'],
                    link: value['LINK'],
                    spotlight: value['SPOTLIGHT'],
                }
            });
        if (events.length > 0) {
            props.uploadEvents({events});
        } else {
            setErrorMessage(eventsUploadError);
        }
    }

    return (
        <ScreenTemplate>
            <div className="settingsContainer">
                {props.user.avatar === undefined || props.isUploadingLibraryData ?
                    <div className="centerLoader">
                        <div style={{marginBottom: 200}}>
                            <div style={{marginLeft: 45, marginBottom: 10}}>
                                <DotLoader color="#FFF" loading={true}/>
                            </div>
                            <TitleText>Uploading</TitleText>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="settingsAvatarWrapper">
                            <div>
                                <Banner topText="Settings" title={props.user.userName}/>
                                <div style={{marginBottom: 35}}>
                                    <BodyText color="#FFF">AVATAR</BodyText>
                                </div>
                                <div className="settingsAvatarWrapper">
                                    <Avatar size="large" image="S" text="" selected={selected === 'S'}
                                            onClick={() => setSelected('S')}/>
                                    <Avatar size="large" image="C" text="" selected={selected === 'C'}
                                            onClick={() => setSelected('C')}/>
                                    <Avatar size="large" image="H" text="" selected={selected === 'H'}
                                            onClick={() => setSelected('H')}/>
                                    <Avatar size="large" image="D" text="" selected={selected === 'D'}
                                            onClick={() => setSelected('D')}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginBottom: 35, marginTop: 48, marginRight: 50, marginLeft: 50}}>
                            <BodyText color="#FFF">MAIN INFO</BodyText>
                            <TextInput
                                value={emailObj.email}
                                placeholder="Email"
                                onChange={(event) => setEmailObj({email: event.target.value, error: false})}
                                email={true}
                                error={emailObj.error}
                            />
                            <TextInput
                                value={passwordObj.password}
                                placeholder="Password"
                                onChange={(event) => setPasswordObj({password: event.target.value, error: false})}
                                password={true}
                                error={passwordObj.error}
                            />
                        </div>
                        <div style={{marginBottom: 35}}>
                            <BodyText color="#FFF">BILLING INFO</BodyText>
                        </div>
                        {props.user.type === 'admin' ?
                            <div>
                                <div style={{marginBottom: 35}}>
                                    <BodyText color="#FFF">CONTENT CONTROL</BodyText>
                                </div>
                                <div className="settingsUploadButtonsWrapper" style={{marginBottom: 0}}>
                                    <FilePicker title={"Import Library"} onFileOpen={importLibrary}/>
                                    <div style={{marginRight: 20, marginBottom: 20}}/>
                                    <FilePicker title={"Import Questions"} onFileOpen={importQuestions}/>
                                </div>
                                <div className="settingsUploadButtonsWrapper">
                                    <FilePicker title={"Import Glossary"} onFileOpen={importGlossary}/>
                                    <div style={{marginRight: 20, marginBottom: 20}}/>
                                    <FilePicker title={"Import Events"} onFileOpen={importEvents}/>
                                </div>
                            </div>
                            : null}

                        <div className="settingsLogoutBtnWrapper">
                            <Button
                                onClick={handleSubmit}
                                width={300}
                                height={44}
                                text="Save"
                                glow
                            />
                        </div>

                        <ErrorDisplay message={showErrorMsg} show={showErrorMsg !== ''}/>

                        <div className="settingsLogoutBtnWrapper">
                            <Button
                                loading={props.isFetchingAuthentication}
                                width={300}
                                height={44}
                                text="Logout"
                                glow
                                onClick={() => {
                                    props.logout((success: boolean) => {
                                        if (success) {
                                            history.push(`/`);
                                        }
                                    })
                                }}
                            />
                        </div>
                        <ErrorDisplay message={errorMessage} show={errorMessage !== ''}/>
                        <a target="_blank"
                           href={`${host.includes('localhost') ? 'http://' + host : 'https://' + host}/version`}><BodyText
                            color="var(--primary)" textDecoration="underline">Version Info</BodyText></a>
                    </div>
                }
            </div>
        </ScreenTemplate>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        isUploadingLibraryData: state.settingsState.isUploadingLibraryData,
        isFetchingAuthentication: state.authState.isFetchingAuthentication,
        errorMessage: state.settingsState.errorMessage
    };
}

const bindActions = (dispatch: any) => {
    return {
        uploadGlossary: (glossary: any) => dispatch(ACTIONS.uploadGlossary(glossary)),
        uploadLibrary: (library: any) => dispatch(ACTIONS.uploadLibrary(library)),
        uploadQuestions: (questions: any) => dispatch(ACTIONS.uploadQuestions(questions)),
        uploadEvents: (events: any) => dispatch(ACTIONS.uploadEvents(events)),
        logout: (callback: (success: boolean) => void) => dispatch(AUTH_ACTIONS.logout(callback)),
        updateUserData: (userData: IUpdateUserData) => dispatch(ACTIONS.updateUserData(userData)),
        settingsErrorMessage: (msg: string) => dispatch(ACTIONS.settingsErrorMessage(msg))
    };
};

export default connect(mapStateToProps, bindActions)(Settings);