import boosterBox from "../assets/bb-menu.png";
import eliteTrBox from "../assets/etb-menu.png";
export default function Shortcuts() {
  return (
    <div className="container mx-auto my-auto px-[10%] py-3 flex items-center justify-between flex-row">
      <a href="#" className="flex items-center space-x-2">
        <img className="w-[300px] h-auto rounded-3xl" src={boosterBox} />
      </a>
      <a href="#" className="flex items-center space-x-2">
        <img className="w-[300px] h-auto rounded-3xl" src={eliteTrBox} />
      </a>
    </div>
  );
}
