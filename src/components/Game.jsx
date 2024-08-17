import { useState } from 'react';
import { Canvas } from './Canvas';
import './Game.css';

export const Game = () => {
    const [player, setPlayer] = useState({
        x: 500,
        y: 500,
        a: 0,
    });
                       //red  blue green orange
    const hslColors = [-1, 0, 240, 120, 30]
    const colors =["black","red", "blue", "green"]
    
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

    const WIDTH = map.length * 100;
    const HEIGHT = map[0].length * 100;

    const castRay = (angle) => {
        if(angle <0){
            console.log(angle)
            angle+=2 * Math.PI;
        }
        if(angle >2*Math.PI){
            angle-=2 * Math.PI;
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
                return -1;
            }

            if (map[mapY][mapX] !== 0) {
                return {distance, color: hslColors[map[mapY][mapX]]};
            }

            px += dirX * stepSize;
            py += dirY * stepSize;
        }

        return -1;
    }

    const getRenderData = () => {
        const data = [];

        const before = new Date();
        for (let i = player.a -(45* 0.017453); i < player.a +( 45 * 0.017453); i += 0.017453) {

            data.push(castRay(i));
        }
        const after = new Date();
        console.log("time took to calculate:", after.getTime() - before.getTime())
        return data;
    }

    return (
        <div className="screen" tabIndex="0"
            // onMouseMove={(e) => {

            //     const newPlayer = { ...player }
            //     newPlayer.a += e.movementX / 10;
            //     setPlayer(newPlayer)
            // }}
            onKeyDown={(e) => {
            //todo: pls optimize this shit
                const newPlayer = { ...player }
                if (e.key == 'a') {
                    newPlayer.a -=0.1;
                    if(newPlayer.a <0){

                        console.log(newPlayer.a)
                        newPlayer.a+=2 * Math.PI;
                    }
                } else if (e.key == 'd') {
                
                    newPlayer.a +=0.1;
                    if(newPlayer.a >2*Math.PI){
                        console.log(newPlayer.a)
                        newPlayer.a-=2 * Math.PI;
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
            }}>
            <Canvas data={getRenderData()}>

            </Canvas>
            <div className='ground' ></div>
        </div>
    );
}