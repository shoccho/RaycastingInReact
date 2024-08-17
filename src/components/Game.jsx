import { useState } from 'react';
import { Canvas } from './Canvas';
import './Game.css';

export const Game = () => {
    const [player, setPlayer] = useState({
        x: 500,
        y: 500,
        a: 0
    });
    const colors =["black","red", "blue", "green"]

    const WIDTH = 8 * 100;
    const HEIGHT = 8 * 100;
    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [3, 0, 0, 0, 0, 0, 0, 2],
        [3, 0, 0, 0, 0, 0, 0, 2],
        [3, 0, 0, 0, 0, 0, 0, 2],
        [3, 0, 0, 0, 0, 0, 0, 1],
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

            if (map[mapY][mapX] !== 0) {
                return {distance, color: colors[map[mapY][mapX]]};
            }

            px += dirX * stepSize;
            py += dirY * stepSize;
        }

        return -1;
    }

    const getRenderData = () => {
        const data = [];
        for (let i = player.a - 45; i < player.a + 45; i += 1) {
            data.push(castRay(i));
        }
        return data;
    }

    return (
        <div className="screen" tabIndex="0"
            onMouseMove={(e) => {

                // const newPlayer = { ...player }
                // newPlayer.a += e.movementX / 10;
                // setPlayer(newPlayer)
            }}
            onKeyDown={(e) => {

                const newPlayer = { ...player }
                if (e.key == 'a') {
                    // newPlayer.x -= 10;
                    newPlayer.a -=1;
                } else if (e.key == 'd') {
                    // newPlayer.x += 10;
                    newPlayer.a +=1;
                } else if (e.key == 's') {

                    const angle = (player.a * Math.PI) / 180;
                    
                    const dx = 10 * Math.cos(angle);
                    const dy = 10 * Math.sin(angle);
                    newPlayer.x -= dx;
                    newPlayer.y -= dy;
                } else if (e.key == 'w') {
                    console.log(player.a)
                    const angle = (player.a * Math.PI) / 180;
                    const dx = 10 * Math.cos(angle);
                    const dy = 10 * Math.sin(angle);
                    
                    newPlayer.x += dx;
                    newPlayer.y += dy;
                    console.log(dx, dy, newPlayer.x, newPlayer.y)
                }
                setPlayer(newPlayer)
            }}>
            <Canvas data={getRenderData()}>

            </Canvas>
            <div className='ground' ></div>
        </div>
    );
}