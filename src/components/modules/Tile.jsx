import OIcon from './OIcon';
import XIcon from './XIcon';

function Tile({ value, onTileClick }) {

  // const [value , setValue] = useState("")

  return (
    <div className='w-20 h-20 cursor-pointer bg-white flex justify-center items-center' onClick={onTileClick}>{
      value !== "" && <div className="animate-ping animate-once animate-duration-200 animate-ease-linear animate-reverse">
        {value === "x" && <XIcon size={50} />}
        {value === "o" && <OIcon size={55} />}
      </div>
    }</div>
  )
}

export default Tile