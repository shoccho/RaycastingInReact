import { useState } from 'react';
import { Canvas } from './Canvas';
import './Game.css';

export const Game = () => {
    const [player, setPlayer] = useState( {
        x: 300,
        y: 300,
        a: 0
    });

    const WIDTH = 8*100;
    const HEIGHT = 8*100;
    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const scale = 100; 

    const castRay = (deg) => {
        const angle = (deg * Math.PI) / 180;
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);
        let px = player.x;
        let py = player.y;
        const stepSize = 1;
        const maxDistance = 700;

        for (let distance = 0; distance < maxDistance; distance += stepSize) {
            const mapX = Math.floor(px / scale);
            const mapY = Math.floor(py / scale);

            if (mapX < 0 || mapX >= map[0].length || mapY < 0 || mapY >= map.length) {
                return -1;
            }

            if (map[mapY][mapX] === 1) {
                return distance;
            }

            px += dirX * stepSize;
            py += dirY * stepSize;
        }

        return -1;
    }

    const getDists = () => {
        const dist = [];
        for (let i = player.a-135; i < player.a-45; i += 1) {
            dist.push(castRay(i));
        }
        return dist;
    }

    return (
        <div className="screen" tabIndex="0" 
        onMouseMove={(e)=>{

            const newPlayer = {...player}
            newPlayer.a += e.movementX/10;
            setPlayer(newPlayer)
        }}
        onKeyDown={(e)=>{

            const newPlayer = {...player}
            if(e.key=='a'){ 
                newPlayer.x -=10;
            }else if(e.key == 'd'){
                newPlayer.x+=10;
            }else if (e.key == 's'){
                newPlayer.y +=10;
            }else if (e.key == 'w'){
                newPlayer.y -=10;
            }
            setPlayer(newPlayer)
        }}>
            <Canvas dists={getDists()}>

            </Canvas>
            <div className='ground' ></div>
        </div>
    );
}