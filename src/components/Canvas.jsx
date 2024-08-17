import { Bar } from "./Bar";

export const Canvas = ({data}) => {
    const renderBars = () =>{
        return data.map((d, index) => (
            <Bar
                key={index}
                dist={d.distance}
                backgroundColor={d.color}
            />
        ));
    };

    return(
     <div className="canvas">
        {renderBars()}
    </div>);

};