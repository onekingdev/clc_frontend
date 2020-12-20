import React, {useState, useRef} from 'react';
import Button from "../../components/Button";
import XLSX from 'xlsx';

import './styles.css';
import BodyText from "../BodyText";
import TitleText from "../TitleText";

interface IFilePicker {
    onFileOpen: (data: any) => void;
    title: string | null;
}

const FilePicker: React.FC<IFilePicker> = ({
                                               onFileOpen,
                                               title
                                           }) => {

    const [file, setFile] = useState<File | null>();
    const inputRef = useRef(null)

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => { // evt = on_file_select event
                /* Parse data */
                const bstr = evt?.target?.result;
                onFileOpen(bstr);
            };
            reader.readAsBinaryString(file);
            setFile(file);
        }
    }

    const chooseFile = () => {
        const current = inputRef.current;
        (current || {
            click: () => {
            }
        }).click()
    }

    return (
        <div>
            <input
                onChange={onChangeFile}
                id="select-file"
                type="file"
                hidden={true}
                ref={inputRef}/>
            <div className="filePickerButton" onClick={chooseFile}>
                <div>
                    <div>
                        <TitleText>+</TitleText>
                    </div>
                    <div>
                        <BodyText>{file?.name || title || "Open File"}</BodyText>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilePicker;