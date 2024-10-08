import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPromt, setPrevPromt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    console.log("data sudah di delay para", index)
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () =>{
    setLoading(false);
    setShowResult(false);
  }

const onSent = async (prompt) => {
    console.log(prompt);
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
        response = await runChat(prompt)
        setRecentPromt(prompt);
    } else {
        setPrevPromt(prev=>[...prev,input])
        setRecentPromt(input);
        response = await runChat(input);
    }
    // setRecentPromt(input);
    // setPrevPromt(prev=>[...prev,input]);
    // const response = await runChat(input);
    let responseArray = response.split("**");
    let newResponse;
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b> " + responseArray[i] + " </b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br></br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

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
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
