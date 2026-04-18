import "../style.css"
interface features {
    image: string;
    title: string;
    text: string;
}
const Featured = ({ features }: { features: features }) => {
    return (
        <div className="w-[80%] flex m-auto h-full items-center justify-between">
            <div className="right w-[55%] bg-black">
                <img src={features.image} alt="" />
            </div>
            <div className="left w-[45%] pl-22">
                <p className="cyan text-base pb-3"> FEATURED</p>
                <p className="text-black text-xl w-[60%] pb-4">{features.title}</p>
                <p className=" text-base pb-3 font-normal">{features.text}</p>
                <button className="cyan-bg text-white text-lg font-medium px-4 py-2">EXPLORE</button>
            </div>
        </div>
    )
}

export default Featured