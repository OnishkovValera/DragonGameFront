import styles from "./SpecialFunctionsMain.module.css";
import {useNavigate} from "react-router-dom";
import GroupByKillerComponent from "../GroupByKillerComponent/GroupByKillerComponent.tsx";
import LessThanToothCountComponent from "../LessThanToothCountComponent/LessThanToothCountComponent.tsx";
import SelectSpeakingDragonsComponent from "../SelectSpeakingDragonsComponent/SelectSpeakingDragonsComponent.tsx";
import {useCallback, useState} from "react";


export default function SpecialFunctionsMain() {
    const navigator = useNavigate();
    const [currentComponent, setCurrentComponent] = useState("groupBy")

    const specialFunctionsComponents = {
        groupBy: <GroupByKillerComponent></GroupByKillerComponent>,
        lessThen: <LessThanToothCountComponent></LessThanToothCountComponent>,
        selectSpeaking: <SelectSpeakingDragonsComponent></SelectSpeakingDragonsComponent>
    }


    const ActiveComponent = useCallback(() => {
        return specialFunctionsComponents[currentComponent]
    }, [currentComponent]);


    return (
        <>
            <div className={styles.Header}>
                <button className={styles.Button} onClick={() => navigator("/main")}>Назад</button>
                <button className={styles.Button} onClick={() => setCurrentComponent("groupBy")}>Группировка по
                    персонажам
                </button>
                <button className={styles.Button} onClick={() => setCurrentComponent("lessThen")}>Количество зубов
                </button>
                <button className={styles.Button} onClick={() => setCurrentComponent("selectSpeaking")}>Говорящие
                    драконы
                </button>
            </div>

            <div className={styles.MainContainer}>
                <ActiveComponent/>
            </div>
        </>
    )
}