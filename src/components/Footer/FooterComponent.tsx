import styles from "./FooterComponent.module.css"


export default function FooterComponent({selected}:{selected:number}) {
    const currentNumber: number = 1

    const someThing:number = selected

    return (
        <div className={styles.footer}>
            <div className={styles.pagingButtonContainer}>
                <button className={styles.Button}>Предыдущая</button>
                <a className={styles.currentNumber}>{currentNumber}</a>
                <button className={styles.Button}>Следующая</button>
            </div>
        </div>
    )
}