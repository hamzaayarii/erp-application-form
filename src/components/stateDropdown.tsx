import { useState } from "react";
import { useCandidate, fieldName } from "../context/candidate";

interface StateDropdownProps {
    fieldName: fieldName;
    label: string;
    required?: boolean;
    error?: string;
}

const StateDropdown = ({ fieldName, label, required = false, error }: StateDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { setCandidateByField, ...candidate } = useCandidate();

    // Sample states/governorates - you can expand this list
    const states = [
        "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", 
        "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Kairouan",
        "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia",
        "Sfax", "Gafsa", "Tozeur", "Kebili", "Gabès", "Medenine", "Tataouine"
    ];

    const handleSelect = (state: string) => {
        setCandidateByField(fieldName, state);
        setIsOpen(false);
    };

    const selectedState = candidate[fieldName];

    return (
        <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-3 py-2 border rounded-md text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <span className={selectedState ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedState || 'Select your state'}
                    </span>
                    <svg
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {states.map((state) => (
                            <button
                                key={state}
                                type="button"
                                onClick={() => handleSelect(state)}
                                className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default StateDropdown;
