export const Bar = ({ dist, backgroundColor }) => {

    const lerp = (x, x0, x1, y0, y1) => {
        if (x == -1) return;
        x = Math.max(x0, Math.min(x1, x));

        const t = (x - x0) / (x1 - x0);
        return y0 + t * (y1 - y0);
    }

    return <div
        className="bar"
        style={{
        height: `${lerp(dist, 0, 600, 400, 0)}px`,
        backgroundColor: `hsl(${backgroundColor},  100%, ${lerp(dist, 0, 600, 50, 5)}%)`
            
        }}></div>
}