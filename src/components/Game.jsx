import { useState } from 'react';
import { Canvas } from './Canvas';
import './Game.css';

export const Game = ({player, setPlayer}) => {
   
    //red  blue green orange
    const hslColors = [-1, 0, 240, 120, 30]

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

    const scale = 100;

    const WIDTH = map.length * scale;
    const HEIGHT = map[0].length * scale;

    const castRay = (angle) => {
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        if (angle > 2 * Math.PI) {
            angle -= 2 * Math.PI;
        }
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);
        let px = player.x;
        let py = player.y;
        const stepSize = 1;
        const maxDistance = Math.min(WIDTH, HEIGHT);

        for (let distance = 0; distance < maxDistance; distance += stepSize) {
            const mapX = Math.floor(px / scale);
            const mapY = Math.floor(py / scale);

            if (mapX < 0 || mapX >= map[0].length || mapY < 0 || mapY >= map.length) {
                return { distance: Infinity, color: 0 };
            }

            if (map[mapY][mapX] !== 0) {
                let cameraAngle = player.a - angle;
                if (cameraAngle < 0) cameraAngle += 2 * Math.PI;
                else if (cameraAngle > 2 * Math.PI) cameraAngle -= 2 * Math.PI;
                return { distance: distance * Math.cos(cameraAngle), color: hslColors[map[mapY][mapX]] };
            }

            px += dirX * stepSize;
            py += dirY * stepSize;
        }
        return { distance: Infinity, color: 0 };
    }

    const getRenderData = () => {
        const bdata = [];
        for (let i = player.a - (45 * 0.017453); i < player.a + (45 * 0.017453); i += 0.017453) {
            const d = castRay(i);
            bdata.push(d)
        }
        return bdata;
    }
    const [data, setData] =  useState(getRenderData());

    setTimeout(() => {
        setData(getRenderData());
    }, 1000/60);

    const keyDownHandler = (e) => {
        //todo: pls optimize this shit
        const newPlayer = { ...player }
        if (e.key == 'a') {
            newPlayer.a -= 0.1;
            if (newPlayer.a < 0) {
                newPlayer.a += 2 * Math.PI;
            }
        } else if (e.key == 'd') {
            newPlayer.a += 0.1;
            if (newPlayer.a > 2 * Math.PI) {
                newPlayer.a -= 2 * Math.PI;
            }
        } else if (e.key == 's') {

            const dx = 10 * Math.cos(player.a);
            const dy = 10 * Math.sin(player.a);
            newPlayer.x -= dx;
            newPlayer.y -= dy;
        } else if (e.key == 'w') {
            const dx = 10 * Math.cos(player.a);
            const dy = 10 * Math.sin(player.a);

            newPlayer.x += dx;
            newPlayer.y += dy;
        }
        setPlayer(newPlayer)
    }

    return (
        <div className="screen" tabIndex="0"
            onKeyDown={keyDownHandler}>
            <Canvas data={data}/>
            <div className='ground' >
            </div>
        </div>
    );
}