import React, { useState } from 'react'
// import SliderComponent from './Slider'
const Boxes = () => {
    const [states, setstates] = useState(["","","","","","","","",""])
    const [toggle, settoggle] = useState(true)
    const [answer, setanswer] = useState([false,false,false,false,false,false,false,false,false])
    const [win, setwin] = useState(false)
    const [isblocked, setisblocked] = useState(false)
    const [isOn, setIsOn] = useState(false);
    const [computeroptions, setcomputeroptions] = useState([0,1,2,3,4,5,6,7,8])
    const [cwin, setcwin] = useState(false)
    const [isdraw, setisdraw] = useState(false)
    const handler=(ev)=>{
        if(ev.target.classList[0] == 'square'){
            console.log(ev.target.id)
            let id = ev.target.id;
            if( states[id] != "") return;
                let newstates = [...states];
                if(toggle) newstates[id]='O'
                else newstates[id]='X'
            settoggle((prev)=> !prev)
            let check= ifwin(id,newstates) 
            if(check) {
                setwin(check);
                setisblocked(true)
            }
            setstates(newstates);

        } 
    }
    const computerhandler=(ev)=>{
        if(ev.target.classList[0] == 'square'){
            console.log(ev.target.id)
            let id = ev.target.id;
            if( states[id] != "") return;
                let newstates = [...states];
                newstates[id]='O'
            let check= ifwin(id,newstates) 
            if(check) {
                setwin(check);
                setisblocked(true);
                setcwin(false);
                return setstates(newstates);
            }
            let cnstates= computeroptions.filter(item=> item != id);
            let chanceindex = Math.floor(Math.random() * cnstates.length);
            let chance= cnstates[chanceindex];
            newstates[chance]='X';
            cnstates= cnstates.filter(item=> item != chance);
            setcomputeroptions(cnstates)
            settoggle((prev)=> !prev)

            let ccheck= checkWinner(newstates);
            if(ccheck) {
                setwin(ccheck);
                setisblocked(true)
            }
            setstates(newstates);
        } 
    }
    const checkWinner = (board) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              setcwin(true);
              let newanswer= [...answer]
              newanswer[a] = true;newanswer[b] = true;newanswer[c] = true;
              setanswer(newanswer);
              return true;
            }
          }
          if (board.every((square) => square !== "")) {
            setisdraw(true);
        }
    }
    const ifwin=(id,nstates)=>{
        let i = Math.floor(id/3)*3;
        if( nstates[i] == nstates[i+1] && nstates[i+1] == nstates[i+2] ) {
            let newanswer= [...answer]
            newanswer[i] = true;newanswer[i+1] = true;newanswer[i+2] = true;
            setanswer(newanswer);
            return true;
        }
        let col = id %3;
        if( nstates[col]== nstates[col+3] && nstates[col+6] == nstates[col+3]){
            let newanswer= [...answer]
            newanswer[col] = true;newanswer[col+3] = true;newanswer[col+6] = true;
            setanswer(newanswer);
            return true;}
        let row = Math.floor(id/3);
        if( col+row != 3){
            if( nstates[4]!="" && nstates[0] == nstates[4] && nstates[4] == nstates[8]) {
                let newanswer= [...answer]
                newanswer[4] = true;newanswer[0] = true;newanswer[8] = true;
                setanswer(newanswer);
                return true;}
            if( nstates[4]!=="" && nstates[2] == nstates[4] && nstates[4] == nstates[6]) {
                let newanswer= [...answer]
                newanswer[4] = true;newanswer[2] = true;newanswer[6] = true;
                setanswer(newanswer);
                return true;}
        }
        if (nstates.every((square) => square !== "")) {
            setisdraw(true);
        }
        return false;
    }
    const resetgame=()=>{
        setstates(["","","","","","","","",""]);
        setwin(false)
        setanswer([false,false,false,false,false,false,false,false,false]);
        setisblocked(false)
        setcomputeroptions([0,1,2,3,4,5,6,7,8])
        setisdraw(false)
    }
    const handleToggle = () => {
        setIsOn((prevIsOn) => !prevIsOn);
        setstates(["","","","","","","","",""]);
        setwin(false)
        setanswer([false,false,false,false,false,false,false,false,false]);
        setisblocked(false)
        setcomputeroptions([0,1,2,3,4,5,6,7,8])
        setisdraw(false)
      };
  return (
    <div className="main">
        <div className="heading">Tic-Tac-Toe
            <div className={`toggle-container ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
                <div className="toggle-button"></div>
            </div>
        </div>
        {isOn ?
            <div className={`board ${isblocked ? "block":""}`} onClick={computerhandler}><span>You Vs Computer</span>
            <div className='winstatement'> {win ? cwin ? "You Lose":"You Won!!!"  :   isdraw ? "Draw":"Play your chance"} </div>
            {states.map((state,indx)=>{
                return <button className={`square ${answer[indx] ? "ans": ""}`} id={indx} key={indx}> {state } </button>
            })}
            </div>
            :
            <div className={`board ${isblocked ? "block":""}`} onClick={handler}><span>Player Vs Player</span>
                <div className='winstatement'> {win ? toggle ? "X Wins!!!":"O Wins!!!"  :  isdraw ? "Draw": toggle ? "O's turn":"X's turn"} </div>
                {states.map((state,indx)=>{
                    return <button className={`square ${answer[indx] ? "ans": ""}`} id={indx} key={indx}> {state } </button>
                })}
            </div>
        }
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className='reset' onClick={resetgame} >ReStart</button>
        </div>
        
    </div>
  )
}

export default Boxes