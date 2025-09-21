import { LooseValue } from 'react-calendar/dist/cjs/shared/types';
import { useCandidate } from '../context/candidate';
import classNames from 'classnames';
import { cn } from '../lib/utils';

const Slots = ({date,error}:{date:LooseValue,error?:string}) => {

    const {slots,setSlots}=useCandidate()

    const saveSlot=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        console.log(e.currentTarget.value);
        
        if (!slots.includes(e.currentTarget.value)){
            setSlots(slots.concat(e.currentTarget.value))
        }else {
            setSlots(slots.filter((slot)=>slot!=e.currentTarget.value))
        }

        console.log(slots);
    }

    return ( 
        <div className="flex flex-col gap-2 w-1/3">
        <h2>{date?.toString()}</h2>
        <div className="grid grid-cols-2 gap-2 h-80 content-start">
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("9-10 AM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="9-10 AM">9-10 AM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("10-11 AM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="10-11 AM">10-11 AM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("11-12 PM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="11-12 PM">11-12 PM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("12-13 PM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="12-13 PM">12-13 PM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("13-14 AM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="13-14 AM">13-14 AM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("14-15 AM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="14-15 AM">14-15 AM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("15-16 PM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="15-16 PM">15-16 PM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("16-17 PM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="16-17 PM">16-17 PM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("17-18 AM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="17-18 AM">17-18 AM</button>
            
            <button className={cn("text-blue-500 border border-blue-500 px-6 py-3 rounded-lg bg-white lg:hover:bg-blue-500 lg:hover:text-white transition-colors duration-300 ease-in-out text-sm min-h-[47px]",
                slots.includes("18-19 AM") && " bg-blue-500 text-white"
            )} onClick={(e)=>saveSlot(e)} value="18-19 AM">18-19 AM</button>
        </div>
        {error && <small className='text-red-500'>{error}</small>}
    </div>
     );
}
 
export default Slots;