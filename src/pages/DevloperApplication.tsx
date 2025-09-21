import { CandidateProvider } from "../context/candidate";
import DeveloperForm from "../components/developerForm";
import logo from "../assets/logo.jpg";

const DevloperApplication = () => {

return(
<main className="container  mx-auto px-52 ">
    <div className="absolute top-4 left-4">
        <img src={logo} alt="Company Logo" className="h-24 w-auto" />
    </div>
    <header className="text-center flex flex-col items-center gap-7 pt-4 ">
        <div className="flex flex-col gap-8 capitalize w-full">
            <h1 className=" text-blue-500 font-semibold text-3xl ">"Developer" Application Form</h1>
            <hr className=" border-gray-400"/>
            <h2 className="">Please fill out the form below to submit your application!</h2>
        </div>
    </header>

    <CandidateProvider>
    <DeveloperForm/>
    </CandidateProvider>
   
</main>

)}

export default DevloperApplication;