import { useEffect,useRef, useState } from 'react';
import { Canvas } from './Canvas';
import './Game.css';


export const Game = () => {

    const [player, setPlayer] = useState({
        x: 160,
        y: 400,
        a: 0,
    });

    const [keyState, setKeyState] = useState({
        'a':false, 'w': false, 's': false, 'd': false
    })
    
    //red  blue green orange
    const hslColors = [-1, 0, 240, 120, 30]
    const colors = ["black", "red", "blue", "green", "aqua"];

    const map = [
        [1, 1, 1, 4, 4, 4, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [3, 0, 0, 0, 0, 2, 2, 2],
        [3, 0, 0, 0, 0, 0, 0, 2],
        [3, 0, 0, 0, 0, 0, 0, 2],
        [3, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const tmap = [
        [1, 1, 1, 4, 4, 4, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [3, 0, 0, 0, 0, 2, 0, 2],
        [3, 0, 0, 0, 0, 2, 0, 2],
        [3, 0, 3, 3, 3, 2, 0, 2],
        [3, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const scale = 100;

    const updatePlayer = (dt) => {
        const newPlayer = { ...player }
        if (keyState['a']) {
            newPlayer.a -= 1 *dt;
            if (newPlayer.a < 0) {
                newPlayer.a += 2 * Math.PI;
            }
        } else if (keyState['d']) {
            newPlayer.a += 1 * dt;
            if (newPlayer.a > 2 * Math.PI) {
                newPlayer.a -= 2 * Math.PI;
            }
        } else if (keyState['s']) {

            const dx = 100 * dt * Math.cos(player.a);
            const dy = 100 * dt * Math.sin(player.a);
            newPlayer.x -= dx;
            newPlayer.y -= dy;
        } else if (keyState['w']) {
            const dx = 100*dt* Math.cos(player.a);
            const dy = 100*dt* Math.sin(player.a);

            newPlayer.x += dx;
            newPlayer.y += dy;
        }
        // console.log(newPlayer)
        setPlayer(newPlayer)
    }
    
    const keyDownHandler = (e) => {
        const newKeyState = {...keyState}
        newKeyState[e.key]=true
        setKeyState(newKeyState);
    }
    const keyUpHandler = (e) =>{  
        const newKeyState = {...keyState}
        newKeyState[e.key]=false
        setKeyState(newKeyState);
    }

    return (
        <div className="screen">
            <Canvas player={player} map={tmap} scale={scale} colors={hslColors} updatePlayer={updatePlayer} keyState={keyState}
            keyDownHandler={keyDownHandler} keyUpHandler={keyUpHandler}/>
            <div className='ground' >
                {/* {renderGround()} */}
            </div>
            {/* <Hack update={update}/> */}
        </div>
    );
}