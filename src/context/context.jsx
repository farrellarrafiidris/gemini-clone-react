import { createContext, useState } from "react";
import runChat from "../config/gemini"

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPromt, setRecentPromt] = useState("")
    const [prevPromt, setPrevPromt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const onSent = async(prompt) => {
        console.log(prompt)
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPromt(input)
        const response = await runChat(input);
        setResultData(response);
        setLoading(false)
        setInput("")
    }



    const contextValue = {
        prevPromt,
        setPrevPromt,
        onSent,
        setRecentPromt,
        recentPromt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;