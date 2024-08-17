import { Bar } from "./Bar";

export const Canvas = ({dists}) => {
    const renderBars = () =>{
    return dists.map((dist, index) => (
        <Bar
            key={index}
            dist={dist}
            backgroundColor={"red"}
        />
    ));
    };

    return(
     <div className="canvas">
        {renderBars()}
    </div>);

};