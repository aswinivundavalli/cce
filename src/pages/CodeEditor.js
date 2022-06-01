import React, { useState, useEffect } from 'react'; 
//import { render } from "react-dom"; 
import AceEditor from "react-ace"; 
import {useLocation} from 'react-router-dom'; 
import "ace-builds/src-noconflict/mode-java"; 
import "ace-builds/src-noconflict/theme-github"; 
import "ace-builds/src-noconflict/ext-language_tools"; 


function onChange(newValue) { 
    console.log("new value:", newValue); 
    const requestOptions = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                       'Access-Control-Allow-Origin': '*',
                       'Access-Control-Allow-Headers': 'Content-Type'},
            body: JSON.stringify({"newData": newValue}) 
            }; 

    fetch('/1', requestOptions) 
        .then(response => response.json()) 
        .then(response => response) 
        .then(data => data); 
} 

export default function CodeEditor () { 
    const location = useLocation(); 
    const id = location.pathname.split('/').at(-1); 
    console.log("document id:", id); 
    //var defaultValue; 
    const [backEndData, setBackEndData] = useState([{}]) 
    const [defaultValue, setDefaultValue] = useState([{}]) 
    //setBackEndData("") 
    useEffect(() => { 
        //var defaultValue; 
        // GET request using fetch inside useEffect React hook 
        const requestOptions = { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json',
                       'Access-Control-Allow-Origin': '*',
                       'Access-Control-Allow-Headers': 'Content-Type'}
            };
        fetch('/' + id, requestOptions) 
            .then(response => response.json()) 
            .then(response => {setDefaultValue(response); console.log("Response2:", response); setBackEndData(response["code"]); console.log("backData:",backEndData);}) 
            .then(data => {console.log("Data:", data)}); 
        //console.log(response, data) 
        // empty dependency array means this effect will only run once (like componentDidMount in classes) 
    }, []);
    console.log("backEndData_2:", backEndData) 
    console.log("default value:", defaultValue['code'])
    return( 
        <AceEditor 
            mode="java" 
            theme="github" 
            onChange={onChange()} 
            name="UNIQUE_ID_OF_DIV" 
            //defaultValue= {backEndData} 
            //defaultValue="var i = 4;" 
            defaultValue= {defaultValue['code'] || 'console.log("hello")'} 
            editorProps={{ $blockScrolling: true }}
        /> 
    ) 
}