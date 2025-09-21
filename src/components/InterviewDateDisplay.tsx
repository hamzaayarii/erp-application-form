import { useCandidate } from '../context/candidate';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';

interface InterviewDateDisplayProps {
    date: LooseValue;
}

const InterviewDateDisplay = ({ date }: InterviewDateDisplayProps) => {
    const { slots, setSlots } = useCandidate();

    if (!date || slots.length === 0) return null;

    return (
        <div className="w-full max-w-xs">
    <h3 className="text-xs text-gray-600 mb-2 text-center ">Interview date:</h3>
    <div className="flex flex-col gap-1">
        {slots.map((slot) => (
            <div key={slot} className="flex items-center justify-center bg-gray-100 px-1 py-0.5 rounded-md text-xs border border-gray-300 h-[60px] w-[150px] mx-auto">
                <span className="text-gray-700 text-xs">
                    {new Date(date?.toString() || '').toLocaleDateString('en-US', { 
                        month: 'numeric', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })} {slot}
                </span>
                <button
                    onClick={() => setSlots(slots.filter(s => s !== slot))}
                    className="text-red-500 hover:text-red-700 text-xs ml-1"
                >
                    ×
                </button>
            </div>
        ))}
    </div>
</div>
    );
};

export default InterviewDateDisplay;
