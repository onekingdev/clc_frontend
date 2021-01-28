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
import {libraryUploadError, questionsUploadError, glossaryUploadError} from "../../helpers/constants";


function Settings(props: any) {
    const history = useHistory();
    const [file, setFile] = useState<FileList | null>();
    const [errorMessage, setErrorMessage] = useState('');

    const inputRef = useRef(null)

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

    const bulkImportLibrary = (sheets: { [email: string]: Object; }) => {
        let library = (sheets["LIBRARIES"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    image: value['IMAGE'],
                    duration: value['DURATION'],
                    title: value['TITLE'],
                    description: value['DESCRIPTION'],
                    url: value['URL'],
                    type: value['TYPE'] // usage, faq
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
                    handHistory: value['HAND_HISTORY'],
                    reward: {chips: value['REWARD_CHIPS'], tickets: value['REWARD_TICKETS']}
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
                    word: value['WORD'],
                    meaning: value['MEANING'],
                }
            });
        if (glossary.length > 0) {
            props.uploadLibrary({glossary});
        } else {
            setErrorMessage(glossaryUploadError);
        }
    }

    return (
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
                        <Avatar size="large" image={props.user.avatar} text={props.user.userName}/>
                    </div>
                    {props.user.type === 'admin' ?
                        <div className="settingsUploadButtonsWrapper">
                            {/*<FilePicker title={"Import Library"} onFileOpen={importLibrary}/>*/}
                            {/*<FilePicker title={"Import Questions"} onFileOpen={importQuestions}/>*/}
                            {/*<FilePicker title={"Import Glossary"} onFileOpen={importQuestions}/>*/}
                        </div>
                        : null}

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
                                        window.location.reload();
                                        history.push(`/`);
                                    }
                                })
                            }}
                        />
                    </div>
                    <ErrorDisplay message={errorMessage} show={errorMessage !== ''}/>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        isUploadingLibraryData: state.settingsState.isUploadingLibraryData,
        isFetchingAuthentication: state.authState.isFetchingAuthentication,
        messageCode: state.authState.messageCode
    };
}

const bindActions = (dispatch: any) => {
    return {
        uploadGlossary: (glossary: any) => dispatch(ACTIONS),
        uploadLibrary: (library: any) => dispatch(ACTIONS.uploadLibrary(library)),
        uploadQuestions: (questions: any) => dispatch(ACTIONS.uploadQuestions(questions)),
        logout: (callback: (success: boolean) => void) => dispatch(AUTH_ACTIONS.logout(callback))
    };
};

export default connect(mapStateToProps, bindActions)(Settings);