import React, { useEffect } from "react";
import { useState } from "react";
import Notification from "./Notification";
import Timer from "./Timer";
export default function Textfram() {
  const [numberOfword, setnumberOfword] = useState(0);
  const [textmode, settextmode] = useState(false);
  const [incuurectWord, setincuurectWord] = useState(0);
  const [notify, setnotify] = useState(true);
  const [rendermsg, setrendermsg] = useState(false);
  const [timerRender,settimerRender ]= useState(false)
  const [word, setword] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin ac ligula auctor, scelerisque est nec, vehicula magna. Integer ut diam id quam sagittis dignissim. Suspendisse potenti. Ut id nisi a quam fermentum laoreet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin ac ligula auctor, scelerisque est nec, vehicula magna."
  );

  function find_WPM(data) {
    let numberOfWords = 0;
    const words = data
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    numberOfWords = words.length;
    setnumberOfword(numberOfWords);
  }
  function find_worng_word(value) {
    let count = 0;
    let first = "";
    let second = "";
    for (let index = 0; index < value.length; index++) {
      first = first + value[index];
      second = second + word[index];
      if (value[index] === " ") {
        if (first !== second) {
          count++;
        }
        first = "";
        second = "";
      }
    }
    setincuurectWord(count);
  }
  function typing(value) {
    find_WPM(value);
    settextmode(true);
    find_worng_word(value);
  }

  return (
    <div className="bg-slate-900 fixed z-10 h-full w-screen flex flex-col justify-center items-center">
     {
      timerRender ? <Timer/> : <> </>
     }

      {rendermsg ? (
        <Notification
          numberOfWord={numberOfword}
          notify={notify}
          incuurectWord={incuurectWord}
          
        />
      ) : (
        <> </>
      )}

      <textarea
        disabled={textmode}
        spellCheck={false}
        onChange={(e) => {
          settimerRender(true)
          setTimeout(() => {
            typing(e.target.value);
            setnotify(true);
            setrendermsg(true);
            settimerRender(false)
          }, 60000);
        }}
        type="text"
        id="text"
        className="h-80 w-[50rem] z-20 focus:outline-none font-sans fixed  bg-transparent text-3xl bg-red-900 border-slate-900  no-resize text-white"
      ></textarea>
      <h1 className=" text-white h-50 w-[50rem] fixed pt-[2px] flex flex-col justify-center  opacity-30 z-10  text-wrap text-3xl">
        {word}
      </h1>
    </div>
  );
}
