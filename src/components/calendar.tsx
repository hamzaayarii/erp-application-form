import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Slots from './slots';
import InterviewDateDisplay from './InterviewDateDisplay';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';
import { useCandidate } from '../context/candidate';




function CalendarComponent({error,slotError}: { error?: string,slotError?:string}) {
    const {interviewDate,setInterviewDate}=useCandidate()

    function onChange(nextValue:LooseValue) {
        const d = new Date(nextValue?.toString()||'');
        setInterviewDate(d.toDateString());
    }
  
   
    return (
        <div>       
            <div className='flex flex-row gap-8 justify-center'>
                <div className='flex flex-col gap-2 '>      
                    <h1>Preferred Interview Date</h1> 
                    <Calendar
                        onChange={onChange}
                        value={interviewDate}
                        // className="w-1/3"
                    />
                    {error && <small className='text-red-500'>{error}</small>}

                </div>
                {interviewDate && <Slots date={interviewDate} error={slotError} />}
            </div>
            {/* Interview Date Display - Centered */}
            {interviewDate && (
                <div className="flex justify-center mt-8">
                    <InterviewDateDisplay date={interviewDate} />
                </div>
            )}
        </div>
    );
  }

export default CalendarComponent;