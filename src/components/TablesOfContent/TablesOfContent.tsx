import styles from "./TablesOfContent.module.css"
import {useEffect, useState} from "react";
import Dragons from "../../components/Dragons/Dragons.tsx";
import Persons from "../../components/Persons/Persons.tsx";
import Commands from "../../components/Commands/Commands.tsx";
import HeaderComponent from "../Header/HeaderComponent.tsx";
import FooterComponent from "../Footer/FooterComponent.tsx";

export default function TablesOfContent(){

    const [selected, setSelected] = useState(0);
    const [currentNumber, setCurrentNumber] = useState(0);


    useEffect(() => {
        setCurrentNumber(0)
    }, [selected]);

    return (
        <div className={styles.container}>
            <HeaderComponent setSelected={setSelected} selected={selected}/>
            {selected === 0 && <Dragons currentNumber={currentNumber}/>}
            {selected === 1 && <Persons currentNumber={currentNumber}/>}
            {selected === 2 && <Commands currentNumber={currentNumber}/>}
            <FooterComponent currentNumber={currentNumber} setCurrentNumber={setCurrentNumber}/>
        </div>
    )
}