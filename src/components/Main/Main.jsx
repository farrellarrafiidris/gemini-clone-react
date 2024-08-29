import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPromt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  console.log("data sudah di main",resultData);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          src={assets.user_icon}
          alt=""
        />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can i help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img
                  src={assets.compass_icon}
                  alt=""
                />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img
                  src={assets.bulb_icon}
                  alt=""
                />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img
                  src={assets.message_icon_card}
                  alt=""
                />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img
                  src={assets.code_icon}
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img
                src={assets.user_icon}
                alt=""
              />
              <p>{recentPromt}</p>
            </div>
            <div className="result-data">
              <img
                src={assets.gemini_icon}
                alt=""
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter promt here.."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>
              <img
                src={assets.gallery_icon}
                alt=""
              />
              <img
                src={assets.mic_icon}
                alt=""
              />

              {!input ? "" : <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  console.log("clicl onsent");
                  return onSent();
                }}
              />}
              
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. <span>Your privacy & Gemini Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
};
//https://www.youtube.com/watch?v=0yboGn8errU&t=4638s
// 1:19:00
export default Main;
