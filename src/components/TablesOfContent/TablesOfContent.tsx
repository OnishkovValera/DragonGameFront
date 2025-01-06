import styles from "./TablesOfContent.module.css"
import {useState} from "react";
import Dragons from "../../components/Dragons/Dragons.tsx";
import Persons from "../../components/Persons/Persons.tsx";
import Commands from "../../components/Commands/Commands.tsx";
import HeaderComponent from "../Header/HeaderComponent.tsx";
import FooterComponent from "../Footer/FooterComponent.tsx";

export default function TablesOfContent(){

    const [selected, setSelected] = useState(0);


    return (
        <div className={styles.container}>
            <HeaderComponent setSelected={setSelected} selected={selected}/>
            {selected === 0 && <Dragons/>}
            {selected === 1 && <Persons/>}
            {selected === 2 && <Commands/>}
            <FooterComponent selected={selected}/>
        </div>
    )
}