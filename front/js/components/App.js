/**
 * @file App component.
 */
// import './App.css';
import '../../css/app.scss';
import React, { useState } from 'react';
import Scoresheet from './Scoresheet';

const App = () => {
    const [scoreInput, setScoreInput] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [currentPlayerId, setCurrentPlayerId] = useState('');
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
            setCurrentPlayerId(data.players[0].id);
            setGameId(data.game_id);
        });
    }

    const playerShot = () => {  
        let body = {
            score: scoreInput,
            gameId: gameId,
            currentPlayerId: currentPlayerId
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
        setCurrentPlayerId('');
        setFrames([]);
        setPlayerName('');
        setGameId('')
    }

    return (
        <div>
            <div id='title' className='title'>
                Bowling Scoresheet {gameId === '' ? '' : ` - ${playerName}`}
                { gameId === '' ?
                    null
                :
                    <div>
                        <input type="text" placeholder="Enter Number 1 - 10" value={scoreInput} name="score" onChange={e => setScoreInput(e.target.value)}/>
                        <button className="button" type="button" onClick={playerShot}>Enter</button>
                        <button className="button" type="button" onClick={resetGame}>Reset</button>
                    </div>
                }
                
                { gameId === '' ?
                    <div>
                        <input type="text" placeholder="Enter Name" value={playerName} name="name" onChange={e => setPlayerName(e.target.value)}/>
                        <button className="button" type="button" onClick={newGame}>New Game</button>
                    </div>
                :
                null
                }
            </div>
            
                <Scoresheet renderFinalScore={renderFinalScore} renderFinalShot={renderFinalShot} renderScore={renderScore} renderShot={renderShot}/>
        </div>
    );
};

export default App;
