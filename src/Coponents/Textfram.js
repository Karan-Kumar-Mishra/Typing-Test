import { useEffect, useState, useRef } from "react";
import Notification from "./Notification";
import Timer from "./Timer";
import Backgound from "./Background";
import Loading from "./Loading";

export default function Textfram() {
  const [numberOfword, setnumberOfword] = useState(0);
  const [textmode, settextmode] = useState(false);
  const [incuurectWord, setincuurectWord] = useState(0);
  const [notify, setnotify] = useState(true);
  const [rendermsg, setrendermsg] = useState(false);
  const [timerRender, settimerRender] = useState(false);
  const [word, setword] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [needmorewords, setneedmorewords] = useState(false);
  const [number_of_enter, setnumber_of_enter] = useState(0);
  const h1 = useRef(null);

  useEffect(() => {
    
    if(number_of_enter >=4 )
    {
      scrollDiv()
    }
  }, [number_of_enter]); 
  useEffect(() => {
    async function GetText() {
      let word_for_user = "";
      let option = {
        headers: {
          "X-Api-Key": "ejmJoIXDAmujRHErsiqYXw==AJzaZZLc7Zl1nJ4s",
        },
      };
      let text = await fetch(
        "https://api.api-ninjas.com/v1/loremipsum?paragraphs=20",
        option
      );
      text = await text.json();
      word_for_user = text.text;
      setword(word + word_for_user.split(/\n/)[2].substring(0, 555));
      setisLoading(false);
    }
    GetText();
  }, [needmorewords]);
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
  function scrollDiv() {
    const scrollContainer = document.getElementById("scrollContainer");
    const text=document.getElementById('text');
    if (scrollContainer) {
      scrollContainer.scrollTop = text.scrollTop;
    }
  }

  return (
    <div className="bg-slate-900 fixed z-10 h-full w-screen flex flex-col justify-center items-center">
      {timerRender ? <Timer /> : <> </>}
      {isLoading ? <> </> : <Backgound />}
      {isLoading ? <Loading /> : <></>}
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setnumber_of_enter((prev) => prev + 1);
          }
        }}
        onChange={(e) => {
          settimerRender(true);
          setTimeout(() => {
            typing(e.target.value);
            setnotify(true);
            setrendermsg(true);
            settimerRender(false);
          }, 60000);
        }}
        type="text"
        id="text"
        className="h-[9rem]    w-[50rem] mb-[6rem] hide-scrollbar typing-cursor z-30 focus:outline-none  font-sans fixed  bg-transparent text-3xl bg-red-900  no-resize text-white"
      ></textarea>

      <textarea
        id="scrollContainer"
        ref={h1}
        value={word}
        className="text-white bg-transparent scroll-container h-[9rem] mb-[6rem] w-[50rem] hide-scrollbar  overflow-y-scroll  fixed  flex flex-col justify-center  opacity-40 z-20  text-wrap text-3xl shadow-text "
      >

      </textarea>
     
    </div>
  );
}
