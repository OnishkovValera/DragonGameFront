import styles from "./FooterComponent.module.css"


export default function FooterComponent({currentNumber, setCurrentNumber}:{currentNumber: number, setCurrentNumber:(pageNumber:number)=>void}){


    return (
        <div className={styles.footer}>
            <div className={styles.pagingButtonContainer}>
                <button className={styles.Button} onClick={currentNumber > 0 ? ()=>setCurrentNumber(currentNumber-1) : ()=>setCurrentNumber(currentNumber)}>Предыдущая</button>
                <a className={styles.currentNumber}>{currentNumber + 1}</a>
                <button className={styles.Button} onClick={() => setCurrentNumber(currentNumber + 1 )}>Следующая</button>
            </div>
        </div>
    )
}
