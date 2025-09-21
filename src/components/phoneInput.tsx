import { useState, useEffect } from "react";
import { useCandidate, fieldName } from "../context/candidate";

interface Country {
    name: string;
    phone_code: string;
    flag: string;
    flag_url: string;
    iso_code: string;
}

interface PhoneInputProps {
    fieldName: fieldName;
    label: string;
    required?: boolean;
    error?: string;
}

const PhoneInput = ({ fieldName, label, required = false, error }: PhoneInputProps) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const { setCandidateByField, ...candidate } = useCandidate();

    useEffect(() => {
        // Load countries data
        fetch('/Data/Countries.json')
            .then(response => response.json())
            .then(data => {
                setCountries(data.countries);
                // Set Tunisia as default
                const tunisia = data.countries.find((c: Country) => c.name === "Tunisia");
                if (tunisia) {
                    setSelectedCountry(tunisia);
                }
            })
            .catch(error => {
                console.error('Error loading countries:', error);
            });
    }, []);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCandidateByField(fieldName, e.target.value);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex">
                {/* Country Code Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center ${
                            error ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <img 
                            src={selectedCountry ? selectedCountry.flag_url : 'https://flagcdn.com/w320/tn.png'}
                            alt={selectedCountry ? selectedCountry.name : 'Tunisia'}
                            className="w-5 h-4 mr-1 object-cover rounded-sm"
                        />
                        <span className="text-sm font-medium">
                            {selectedCountry ? selectedCountry.phone_code : '+216'}
                        </span>
                        <svg
                            className={`inline ml-1 w-3 h-3 transition-transform ${
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
                        <div className="absolute z-10 left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto w-64">
                            {countries.map((country) => (
                                <button
                                    key={country.name}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-sm flex items-center"
                                >
                                    <img 
                                        src={country.flag_url}
                                        alt={country.name}
                                        className="w-5 h-4 mr-2 object-cover rounded-sm"
                                    />
                                    <span className="font-medium">{country.phone_code}</span>
                                    <span className="ml-2 text-gray-600">{country.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Phone Number Input */}
                <input
                    type="tel"
                    value={candidate[fieldName] || ''}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default PhoneInput;
