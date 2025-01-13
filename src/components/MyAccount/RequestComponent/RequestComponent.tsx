import {AdminRequest} from "../../../api/types/AdminRequest.ts";
import styles from "./RequestComponent.module.css"

export default function RequestComponent({adminRequest, onApprove, onReject}: { adminRequest: AdminRequest , onApprove: (id: number) => void, onReject: (id:number) => void}) {

    const onApproveLocal = () => {
        onApprove(adminRequest.id);
    }

    const onRejectLocal = () => {
        onReject(adminRequest.id);
    }

    return (
        <tr className={styles.requestItem}>
            <th className={styles.firstChild}>{adminRequest.user.name}</th>
            <th>{adminRequest.user.login}</th>
            <th>{adminRequest.status}</th>
            <th>{adminRequest.requestDate?.substring(0, 10)}</th>
            <th>{adminRequest.adminProcessedId?
                adminRequest.adminProcessedId.name:
                <button className={styles.Button} onClick={onApproveLocal}>
                    Принять
                </button> 
            }</th>
            <th className={styles.lastChild}>{adminRequest.processedDate ?
                adminRequest.processedDate.substring(0, 10) :
                <button className={styles.Button} onClick={onRejectLocal}>
                    Отклонить
                </button>
            }</th>
        </tr>
    )

}