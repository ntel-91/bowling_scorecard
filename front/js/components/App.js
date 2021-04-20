/**
 * @file App component.
 */
// import './App.css';
import '../../css/app.scss';
import React, { useState } from 'react';

const App = () => {
    const [scoreInput, setScoreInput] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [gameId, setGameId] = useState('');
    const [frames, setFrames] = useState([]);

    const newGame = () => {
        let body = {
            playerName: playerName
        }
        fetch('http://localhost:3000/games', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(function(data){
            console.log(data)
            setPlayerId(data.id);
            setGameId(data.game_id);
        });
    }

    const playerShot = () => {  
        let body = {
            score: scoreInput,
            gameId: gameId,
            playerId: playerId
        }
        fetch('http://localhost:3000/players', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(function(data) {   
            console.log(data);
            if (data.error == null) {
                setFrames(data.frames);
                setScoreInput('');
            } else {
                alert(data.exception)
            }   
            
        });
    }

    const renderShot = (frame, firstRoll) => {
        if (frames[frame]) {
            if (checkStrike(frames[frame])) {
                return firstRoll ? "" : "X"
            } else if (checkSpare(frames[frame])) {
                return firstRoll ? frames[frame].shot_1 : "/"
            } else {
                return firstRoll ? frames[frame].shot_1 : frames[frame].shot_2 ? frames[frame].shot_2 : "-";
            }
            
        } else {
            return "-";
        }
    }

    const checkStrike = (frame) => {
        return frame.shot_1 === 10 ? true : false
    }

    const checkSpare = (frame) => {
        if (frame.shot_2) {
            return frame.shot_1 + frame.shot_2 === 10;
        } else {
            return false;
        }
    }

    const renderFinalShot = (frame, numberRoll) => {
        if (frames[frame]) {
            if (numberRoll === 1) {
                return frames[frame].shot_1 === 10 ? "X" : frames[frame].shot_1;
            } else if (numberRoll === 2) {
                return frames[frame].shot_2 === 10 ? "X" : frames[frame].shot_1 + frames[frame].shot_2 === 10 ? "/" : frames[frame].shot_2;
            } else if (numberRoll === 3) {
                return frames[frame].shot_3 === 10 ? "X" : frames[frame].shot_2 + frames[frame].shot_3 === 10 ? "/" : frames[frame].shot_3;
            } else {
                return "-";
            }   
        } else {
            return "-";
        }
    }

    const renderScore = (frame) => {
        if (frames[frame]) {
            return frames[frame].frame_complete ? frames[frame].score : "-";
        } else {
            return "-";
        }
    }

    const renderFinalScore = (frame) => {
        if (frames[frame]) {
            if (frames[frame].frame_complete) {
                return frames[frame].score
            } else {
                return "-";
            }
        } else {
            return "-";
        }
    }

    const resetGame = () => {
        setPlayerId('');
        setFrames([]);
        setPlayerName('');
        setPlayerId('');
        setGameId('')
    }

    return (
        <div>
            <div id='title' className='title'>
                Bowling Scoresheet {playerId === '' ? '' : ` - ${playerName}`}
                { playerId === '' ?
                    null
                :
                    <div>
                        <input type="text" placeholder="Enter Number 1 - 10" value={scoreInput} name="score" onChange={e => setScoreInput(e.target.value)}/>
                        <button className="button" type="button" onClick={playerShot}>Enter</button>
                        <button className="button" type="button" onClick={resetGame}>Reset</button>
                    </div>
                }
                
                { playerId === '' ?
                    <div>
                        <input type="text" placeholder="Enter Name" value={playerName} name="name" onChange={e => setPlayerName(e.target.value)}/>
                        <button className="button" type="button" onClick={newGame}>New Game</button>
                    </div>
                :
                null
                }
            </div>
            
        
            <div id='scoresheet'>
                <table id='scoresheetTable' className='scoresheet' cellPadding='1' cellSpacing='0'>
                    <tbody>
                        <tr>
                            <th colSpan='6'>Frame 1</th>
                            <th colSpan='6'>Frame 2</th>
                            <th colSpan='6'>Frame 3</th>
                            <th colSpan='6'>Frame 4</th>
                            <th colSpan='6'>Frame 5</th>
                            <th colSpan='6'>Frame 6</th>
                            <th colSpan='6'>Frame 7</th>
                            <th colSpan='6'>Frame 8</th>
                            <th colSpan='6'>Frame 9</th>
                            <th colSpan='6'>Frame 10</th>
                        </tr>
                        <tr>
                            <td colSpan='3'>{renderShot(0, true)}</td><td colSpan='3'>{renderShot(0, false)}</td>
                            <td colSpan='3'>{renderShot(1, true)}</td><td colSpan='3'>{renderShot(1, false)}</td>
                            <td colSpan='3'>{renderShot(2, true)}</td><td colSpan='3'>{renderShot(2, false)}</td>
                            <td colSpan='3'>{renderShot(3, true)}</td><td colSpan='3'>{renderShot(3, false)}</td>
                            <td colSpan='3'>{renderShot(4, true)}</td><td colSpan='3'>{renderShot(4, false)}</td>
                            <td colSpan='3'>{renderShot(5, true)}</td><td colSpan='3'>{renderShot(5, false)}</td>
                            <td colSpan='3'>{renderShot(6, true)}</td><td colSpan='3'>{renderShot(6, false)}</td>
                            <td colSpan='3'>{renderShot(7, true)}</td><td colSpan='3'>{renderShot(7, false)}</td>
                            <td colSpan='3'>{renderShot(8, true)}</td><td colSpan='3'>{renderShot(8, false)}</td>
                            <td colSpan='2'>{renderFinalShot(9, 1)}</td><td colSpan='2'>{renderFinalShot(9, 2)}</td><td colSpan='2'>{renderFinalShot(9, 3)}</td>
                        </tr>
                        <tr>
                            <td colSpan='6'>{renderScore(0)}</td>
                            <td colSpan='6'>{renderScore(1)}</td>
                            <td colSpan='6'>{renderScore(2)}</td>
                            <td colSpan='6'>{renderScore(3)}</td>
                            <td colSpan='6'>{renderScore(4)}</td>
                            <td colSpan='6'>{renderScore(5)}</td>
                            <td colSpan='6'>{renderScore(6)}</td>
                            <td colSpan='6'>{renderScore(7)}</td>
                            <td colSpan='6'>{renderScore(8)}</td>
                            <td colSpan='6'>{renderFinalScore(9)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
