import  { FunctionComponent } from 'react';
import { fieldName } from '../../context/candidate';
interface InputProps {
    label?:string,
    value:string,
    setCandidateByField:(fieldName:fieldName,value:string)=>void,
    fieldName:fieldName,
    error?:string
}
 
const Input:FunctionComponent<Partial<HTMLInputElement>&InputProps> = ({name,placeholder,type,value,setCandidateByField,fieldName,error,...rest}) => {
    const {required,label}=rest
    return (
        <div className='flex flex-col gap-2 w-full'>
            {label && <label htmlFor={name}>{label} {required && <span className='text-red-600'>*</span>}</label>}
            <input className='border border-[#B6B6B6] rounded-lg outline-none p-1 indent-1' name={name} value={value} type={type} placeholder={placeholder} onChange={(e)=>setCandidateByField(fieldName,e.target.value.toString())} />
            {error && <small className='text-red-500'>{error}</small>}
        </div>
    );
}
 
export default Input;