import styles from "./ChangeObjectInfoModal.module.css"
import {useModalActive} from "../../store/globalStore.ts"
import {ReactElement} from "react";


export default function ChangeObjectInfoModal({children}:{children:ReactElement | undefined}) {
    const {isActive, setIsActive} = useModalActive();

    return (
        <div className={isActive ? `${styles.modal} ${styles.active}` : `${styles.modal}`} onClick={() => setIsActive(false)}>
            <div className={isActive ? `${styles.content} ${styles.active}` : `${styles.content}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>

    )
};