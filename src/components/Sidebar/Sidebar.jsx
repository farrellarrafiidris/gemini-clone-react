import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/context";

const Sidebiar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent,prevPromt,setRecentPromt,newChat} = useContext(Context);

  const laodPrompt = async(prompt) =>{
    setRecentPromt(prompt);
    await onSent(prompt)
  }

  function toggleSidebar() {
    setExtended(!extended)
  }

  return (
    <div onClick={toggleSidebar} className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img
            src={assets.plus_icon}
            alt=""
            className="plus-icon"
          />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPromt.map((item,index) => {
              return (
                <div key={index} onClick={() =>laodPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon}alt=""/>
                  <p>{item.slice(0,10)}...</p>
                </div>
              )})}
           
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img
            src={assets.question_icon}
            alt=""
          />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img
            src={assets.history_icon}
            alt=""
          />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img
            src={assets.setting_icon}
            alt=""
          />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebiar;
