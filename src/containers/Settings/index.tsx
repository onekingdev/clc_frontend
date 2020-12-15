import React, {useState, useEffect, useRef} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
import * as ACTIONS from "../Authentication/store/actions";
// @ts-ignore
import {useHistory} from 'react-router-dom';
import XLSX from 'xlsx';
import FilePicker from '../../components/FilePicker';


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
        bulkImport(sheets);
    }
    
    const bulkImport = (sheets: { [email: string]: Object; }) => {
        console.log(sheets)
        var libraries = (sheets["LIBRARIES"] as Array<Object> || [])
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
        
        var lessons = (sheets["LESSONS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    id: value['ID'],
                    topicID: value['TOPIC_ID'],
                    name: value['NAME']
                }
            });
        
        
        var topics = (sheets["TOPICS"] as Array<Object> || [])
            .map((value: any) => {

                return {
                    id: value['ID'],
                    name: value['NAME'],
                    rank: value['RANK'],
                    chips: value['CHIPS'],
                    tickets: value['TICKETS']
                }
            });
        
        var questions = (sheets["QUESTIONS"] as Array<Object> || [])
            .map((value: any) => {
                return {
                    id: value['ID'], 
                    lessonID: value['LESSON_ID'], 
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
            
        // SEND TO THE API {lessons, questions, topics, libraries}
        console.log({lessons, questions, topics, libraries});
    }

    return (
        <div className="settingsContainer">
            <FilePicker onFileOpen={onFileOpen}></FilePicker>
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
        logout: (callback: (success: boolean) => void) => dispatch(ACTIONS.logout(callback))
    };
};

export default connect(mapStateToProps, bindActions)(Settings);