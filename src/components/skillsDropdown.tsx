import { useState } from "react";
import { useCandidate } from "../context/candidate";

interface SkillsDropdownProps {
    label: string;
    required?: boolean;
    error?: string;
}

const SkillsDropdown = ({ label, required = false, error }: SkillsDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { skills, setSkills } = useCandidate();

    const availableSkills = [
        "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js",
        "Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust", "Swift",
        "HTML/CSS", "SASS/SCSS", "Tailwind CSS", "Bootstrap",
        "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase",
        "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
        "Git", "CI/CD", "Testing", "Agile/Scrum", "UI/UX Design"
    ];

    const handleSkillToggle = (skill: string) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(s => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

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
                    <span className={skills.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                        {skills.length > 0 ? `${skills.length} skills selected` : 'Enter your skills'}
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
                        {availableSkills.map((skill) => (
                            <label
                                key={skill}
                                className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={skills.includes(skill)}
                                    onChange={() => handleSkillToggle(skill)}
                                    className="mr-2 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm">{skill}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            
            {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleSkillToggle(skill)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
            
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default SkillsDropdown;
