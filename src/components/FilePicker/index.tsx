import React, {useState, useRef} from 'react';
import Button from "../../components/Button";
import XLSX from 'xlsx';

import './styles.css';

interface IFilePicker {
    onFileOpen: (data: any) => void;
    title: string | null;
}

const FilePicker: React.FC<IFilePicker> = ({
    onFileOpen,
    title
}) =>  {
    
    const [file, setFile] = useState<File | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef(null)

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const file = e.target.files?.item(0)
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => { // evt = on_file_select event
                /* Parse data */
                const bstr = evt?.target?.result;
                onFileOpen(bstr);
                setIsLoading(false);
            };
            reader.readAsBinaryString(file);
            setFile(file);
        }
    }

    const chooseFile = () => {
        const current = inputRef.current;
        (current || { click: () => {}}).click()
    }

    return (
        <div className="graphContainer">
            <input
                onChange={onChangeFile}
                id="select-file"
                type="file"
                hidden={true}
                ref={inputRef} />
            <Button
                loading={isLoading}
                width={200}
                height={44}
                text={file?.name || title || "Open File"}
                glow
                onClick={chooseFile}
            />
        </div>
    );
}

export default FilePicker;