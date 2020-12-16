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


function Settings(props: any) {
    const history = useHistory();
    const [file, setFile] = useState<FileList | null>();

    const inputRef = useRef(null)

    function chooseFile() {
      const current = inputRef.current;
      (current || { click: () => {}}).click()
    }

    const onFileOpen = (data: any) => {
        const wb = XLSX.read(data, {type:'binary'});
        var sheets: { [email: string]: Array<Object> | Object; } = { };

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
        const sheets = onFileOpen(data);
        bulkImportLibrary(sheets);
    }

    const importQuestions = (data: any) => {
        const sheets = onFileOpen(data);
        bulkImportQuestions(sheets);
    }
    
    const bulkImportLibrary = (sheets: { [email: string]: Object; }) => {
        console.log(sheets)
        var library = (sheets["LIBRARIES"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    id: value['ID'],
                    image: value['IMAGE'],
                    duration: value['DURATION'],
                    title: value['TITLE'],
                    description: value['DESCRIPTION'],
                    url: value['URL'],
                    type: value['TYPE'] // usage, faq
                }
            });
        props.uploadLibrary({ library });
    }
    
    const bulkImportQuestions = (sheets: { [email: string]: Object; }) => {
        var lessons = (sheets["LESSONS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    topicRow: value['TOPIC_ROW'],
                    name: value['NAME']
                }
            });
        
        var topics = (sheets["TOPICS"] as Array<Object> || [])
            .map((value: any) => {

                return {
                    id: value['ID'],
                    name: value['NAME'],
                    masteredLevel: value['MASTERED_LEVEL'],
                    chips: value['CHIPS'],
                    tickets: value['TICKETS']
                }
            });
        
        var questions = (sheets["QUESTIONS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    id: value['ID'], 
                    lessonRow: value['LESSON_ROW'], 
                    questionText: value['QUESTION_TEXT'], 
                    Answers: { 
                        correct: value['ANSWER_CORRECT'], 
                        wrong1: value['ANSWER_WRONG1'], 
                        wrong2: value['ANSWER_WRONG2'], 
                        wrong3: value['ANSWER_WRONG3']
                    },
                    explanation: { correct: value['EXPLANATION_CORRECT'], wrong: value['EXPLANATION_WRONG'] }
                }
            });
        
        props.uploadQuestions({ lessons, questions, topics });
    }

    return (
        <div className="settingsContainer">
            <FilePicker title={"Import Library"} onFileOpen={importLibrary}></FilePicker>
            <FilePicker title={"Import Questions"} onFileOpen={importQuestions}></FilePicker>

            <Button
                loading={props.isFetchingAuthentication}
                width={200}
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
    );
}

const mapStateToProps = (state: any) => {
    return {
        isFetchingAuthentication: state.authState.isFetchingAuthentication,
        messageCode: state.authState.messageCode
    };
}

const bindActions = (dispatch: any) => {
    return {
        uploadLibrary: (library: any) => dispatch(ACTIONS.uploadLibrary(library)),
        uploadQuestions: (questions: any) => dispatch(ACTIONS.uploadQuestions(questions)),
        logout: (callback: (success: boolean) => void) => dispatch(AUTH_ACTIONS.logout(callback))
    };
};

export default connect(mapStateToProps, bindActions)(Settings);