import styles from "./ImportComponent.module.css"
import {ImportData} from "../../../api/types/ImportData.ts";

const ImportComponent = ({file}: { file: ImportData }) => {
    console.log(file)

    return (
        <tr className={styles.importItem}>
            <td className={styles.firstChild}>{file.id}</td>
            <td>{file.date?.substring(0, 10)}</td>
            <td>{file.isSuccess ? "Success" : "Failed"}</td>
            <td>{file.user.name}</td>
            <td className={styles.lastChild}>{file.objectUrl}</td>
        </tr>
    );
};
export default ImportComponent;
