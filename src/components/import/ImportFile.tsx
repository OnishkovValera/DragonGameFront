import styles from "./ImportFile.module.css"
import {useEffect, useState} from "react";
import {ImportData} from "../../api/types/ImportData.ts";
import {api} from "../../api/requests.ts";
import ImportComponent from "./ImportComponent/ImportComponent.tsx";

export default function ImportFile() {
    const [files, setFiles] = useState<ImportData[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchFiles = async () => {
        try {
            const response = await api.get<ImportData[]>("/files");
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        console.log("upload")
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await api.post("/dragon/file_upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).catch(error => {
                console.log(error);
            });

            fetchFiles();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <>
            <div className={styles.fileInputContainer}>
                <input type="file" onChange={handleFileChange} className={styles.fileInput}/>
                <button onClick={handleFileUpload} className={styles.button}>Загрузить</button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.headerRow}>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Success</th>
                        <th>User</th>
                        <th>Object URL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {files.map((file) => (
                        <ImportComponent file={file}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
