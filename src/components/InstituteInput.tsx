import { useState, useEffect } from "react";
import { useCandidate, fieldName } from "../context/candidate";

interface University {
    name: string;
    location: string;
    type: string;
}

interface InstituteInputProps {
    fieldName: fieldName;
    label: string;
    required?: boolean;
    error?: string;
}

const InstituteInput = ({ fieldName, label, required = false, error }: InstituteInputProps) => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [customInstitute, setCustomInstitute] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const { setCandidateByField, ...candidate } = useCandidate();

    useEffect(() => {
        // Load universities data
        fetch('/Data/Universities.json')
            .then(response => response.json())
            .then(data => {
                setUniversities(data.universities);
            })
            .catch(error => {
                console.error('Error loading universities:', error);
            });
    }, []);

    const filteredUniversities = universities.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUniversitySelect = (university: University) => {
        if (university.name === "Other") {
            setIsCustom(true);
            setSearchTerm("");
        } else {
            setCandidateByField(fieldName, university.name);
            setSearchTerm(university.name);
            setIsCustom(false);
        }
        setIsOpen(false);
    };

    const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomInstitute(value);
        setCandidateByField(fieldName, value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
        if (!isCustom) {
            setCandidateByField(fieldName, e.target.value);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {isCustom ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customInstitute}
                            onChange={handleCustomInput}
                            placeholder="Enter your institute name"
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                error ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setIsCustom(false);
                                setCustomInstitute("");
                                setSearchTerm("");
                                setCandidateByField(fieldName, "");
                            }}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                            Select from list
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setIsOpen(true)}
                            placeholder="Search or select institute"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                error ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </>
                )}
                
                {isOpen && !isCustom && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredUniversities.length > 0 ? (
                            filteredUniversities.map((university) => (
                                <button
                                    key={university.name}
                                    type="button"
                                    onClick={() => handleUniversitySelect(university)}
                                    className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-sm"
                                >
                                    <div className="font-medium">{university.name}</div>
                                    {university.location && (
                                        <div className="text-xs text-gray-500">{university.location}</div>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                                No institutes found. You can type to add a custom one.
                            </div>
                        )}
                    </div>
                )}
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default InstituteInput;
