import React, { useState } from 'react'

const Boxes = () => {
    const [states, setstates] = useState(["","","","","","","","",""])
    const [toggle, settoggle] = useState(true)
    const [answer, setanswer] = useState([false,false,false,false,false,false,false,false,false])
    const [win, setwin] = useState(false)
    const [isblocked, setisblocked] = useState(false)
    const handler=(ev)=>{
        if(ev.target.classList[0] == 'square'){
            // console.log(ev.target.id)
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
        return false;
    }
    const resetgame=()=>{
        setstates(["","","","","","","","",""]);
        setwin(false)
        setanswer([false,false,false,false,false,false,false,false,false]);
        setisblocked(false)
    }
  return (
    <div className="main">
        <div className="heading">Tic-Tac-Toe</div>
        <div className={`board ${isblocked ? "block":""}`} onClick={handler}>
            <div className='winstatement'> {win ? toggle ? "X Wins!!!":"O Wins!!!":toggle ? "O's turn":"X's turn"} </div>
            {states.map((state,indx)=>{
                return <button className={`square ${answer[indx] ? "ans": ""}`} id={indx} key={indx}> {state } </button>
            })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className='reset' onClick={resetgame} >ReStart</button>
        </div>
    </div>
  )
}

export default Boxes
        {/* {win && <div className='winstatement'> {toggle ? "X":"O"} Wins!!!!</div>} */}
                        // return <button className='square'  id={indx}>{state}</button>