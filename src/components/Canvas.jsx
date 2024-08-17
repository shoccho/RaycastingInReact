import { Bar } from "./Bar";
import { useState, useEffect, useRef } from "react";
import { Hack } from "./Hack";

export const Canvas = ({map, player,scale, colors, updatePlayer, keyDownHandler, keyUpHandler }) => {
    const [deltaTime, setDeltaTime] = useState(0);
    const prevTimestampRef = useRef(0);


    const update = ()=>{
        const timestamp = new Date().getTime();
        const prevTimestamp = prevTimestampRef.current;
        const delta = prevTimestamp === 0 ? 0 : timestamp - prevTimestamp;
        setDeltaTime(delta/1000);
        prevTimestampRef.current = timestamp;
        updatePlayer(deltaTime);
    }

    const WIDTH = map.length * 100;
    const HEIGHT = map[0].length * 100;

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
                return { distance: distance * Math.cos(cameraAngle), color: colors[map[mapY][mapX]] };
            }

            px += dirX * stepSize;
            py += dirY * stepSize;
        }
        return { distance: Infinity, color: 0 };
    }

    const getRenderData = () => {
        const data = [];
        // fov -45 to 45
        // 1deg = 0.017453 rad
        for (let i = player.a - (45 * 0.017453); i < player.a + (45 * 0.017453); i += 0.017453) {
            const d = castRay(i);
            data.push(d)
        }
        return data;
    }

    const renderBars = () =>{
        return getRenderData().map((d, index) => (
            <Bar
                key={index}
                dist={d.distance}
                backgroundColor={d.color}
            />
        ));
    };

    return(
        <div tabIndex="0" onKeyDown={keyDownHandler} onKeyUp={keyUpHandler} className="canvas">
            {renderBars()}
            <Hack update={update}></Hack>
        </div>
    );

};