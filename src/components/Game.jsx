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
    const colors = ["black", "red", "blue", "green"]

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
        if (angle < 0) {
            console.log(angle)
            angle += 2 * Math.PI;
        }
        if (angle > 2 * Math.PI) {
            angle -= 2 * Math.PI;
        }
        let rayX;
        let rayY;
        let xStep;
        let yStep;
        let depth = 0;
        let aTan = Math.atan(angle);
        if (angle > Math.PI) {
            rayX = ((player.x / scale) * scale) - 0.0001;
            rayY = (player.y - rayY) * aTan + player.x;
            yStep = -scale;
            xStep = -yStep * aTan;
        }
        else if (angle < Math.PI) {
            rayY = ((player.x / scale) * scale) + scale;
            rayX = (player.y - rayY) * aTan + player.x;
            yStep = scale;
            xStep = -yStep * aTan;
        }
        else if (angle == 0 || angle == Math.PI) { rayX = player.x; rayY = player.y; depth = map.length }
        while (depth < map.length) {
            let mx = rayX / scale;
            let my = rayY / scale;
            if (my>0 && my<map.length && map[my][mx] !== 0) {
                // break ?
                depth = map.length;
            } else {
                rayX += xStep;
                rayY += yStep;
            }
        }

        let nTan = Math.tan(angle);
        if (angle > Math.PI / 2 && angle < (3 * Math.PI / 2)) {
            rayX = ((player.x / scale) * scale) - 0.0001;
            rayY = (player.x - rayX) * nTan + player.y;
            xStep = -scale;
            yStep = -yStep * nTan;
        }
        else if (angle < Math.PI / 2 || angle > (3 * Math.PI / 2)) {
            rayX = ((player.y / scale) * scale) + scale;
            rayY = (player.x - rayX) * nTan + player.y;
            xStep = scale;
            yStep = -xStep * nTan;
        }
        else if (angle == 0 || angle == Math.PI) { rayX = player.x; rayY = player.y; depth = map.length }
        while (depth < map.length) {
            let mx = rayX / scale;
            let my = rayY / scale;
            if (map[my][mx] !== 0) {
                // break ?
                return {
                    distance: ((player.x - rayX) * (player.x - rayX)) + ((player.y - rayY) * (player.y - rayy)),
                    color: hslColors[map[my][mx]]
                }
                depth = map.length;
            } else {
                rayX += xStep;
                rayY += yStep;
            }
        }

        return -1;
    }

    const getRenderData = () => {
        const data = [];
        console.log("casting ray")
        const before = new Date();
        for (let i = player.a - (45 * 0.017453); i < player.a + (45 * 0.017453); i += 0.017453) {

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
                    newPlayer.a -= 0.1;
                    if (newPlayer.a < 0) {

                        console.log(newPlayer.a)
                        newPlayer.a += 2 * Math.PI;
                    }
                } else if (e.key == 'd') {

                    newPlayer.a += 0.1;
                    if (newPlayer.a > 2 * Math.PI) {
                        console.log(newPlayer.a)
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
            }}>
            <Canvas data={getRenderData()}>

            </Canvas>
            <div className='ground' ></div>
        </div>
    );
}