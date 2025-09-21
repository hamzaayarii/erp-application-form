import Upload from "./dropzone";
import Input from "./common/input";
import CalendarComponent from "./calendar";
import { useCandidate } from "../context/candidate";
import PhoneInput from "./phoneInput";
import CountryDropdown from "./countryDropdown";
import InstituteInput from "./InstituteInput";
import StateDropdown from "./stateDropdown";
import CityDropdown from "./cityDropdown";
import SkillsDropdown from "./skillsDropdown";
import Dropdown from "./positionDropdown";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const schema=z.object({
//     name:z.string().min(3).max(20),
//     lastname:z.string().min(3).max(20),
//     email:z.string().email(),
//     phone:z.string().min(8).max(8),
//     address:z.string().min(3).max(20),
//     institute:z.string().min(3).max(20),
//     date:z.date(),
//     position:z.string().min(3).max(20),
//     cv:z.any(),
//     availability:z.object({date:z.date(),time:z.array(z.string())}),
// })

const CandidateForm = () => {
    // const form =useForm<z.infer<typeof schema>>({resolver:zodResolver(schema),defaultValues:{name:"",lastname:"",email:"",phone:"",address:"",institute:"",date:new Date(),position:"",cv:"",availability:{date:new Date(),time:[]}}})
    // async function onSubmit(values: z.infer<typeof schema>) {

    // }

    const { setCandidateByField, errors, setErrors, ...candidate } =
        useCandidate();
    const navigate = useNavigate();
    const redirect = (path: string) => {
        navigate(`/${path}`, { replace: true });
    };

    const [firstRender, setFirstRender] = useState(true);

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateAll = () => {
        if (candidate.name === "") {
            setErrors((prev) => {
                return { ...prev, name: "This field is required" };
            });
        } else if (!candidate.name.match(/^[a-zA-Z' ]+$/)) {
            setErrors((prev) => {
                return { ...prev, name: "Name should only contain letters" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, name: "" };
            });
        }
        if (candidate.lastname === "") {
            setErrors((prev) => {
                return { ...prev, lastname: "This field is required" };
            });
        } else if (!candidate.lastname.match(/^[a-zA-Z' ]+$/)) {
            setErrors((prev) => {
                return {
                    ...prev,
                    lastname: "Lastname should only contain letters",
                };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, lastname: "" };
            });
        }
        if (candidate.email === "") {
            setErrors((prev) => {
                return { ...prev, email: "This field is required" };
            });
        } else if (!validateEmail(candidate.email)) {
            setErrors((prev) => {
                return { ...prev, email: "Please enter a valid email" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, email: "" };
            });
        }
        if (candidate.phone === "") {
            setErrors((prev) => {
                return { ...prev, phone: "This field is required" };
            });
        } else if (!candidate.phone.match(/^((\+[0-9]{9,12})|([0-9]{8}))$/)) {
            setErrors((prev) => {
                return { ...prev, phone: "Please enter a valid Phone number" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, phone: "" };
            });
        }
        if (candidate.address === "") {
            setErrors((prev) => {
                return { ...prev, address: "This field is required" };
            });
        } else if (!candidate.address.match(/^[a-zA-Z, ]+$/)) {
            setErrors((prev) => {
                return {
                    ...prev,
                    address: "Address should only contain letters",
                };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, address: "" };
            });
        }
        if (candidate.institute === "") {
            setErrors((prev) => {
                return { ...prev, institute: "This field is required" };
            });
        } else if (!candidate.institute.match(/^[a-zA-Z' ]+$/)) {
            setErrors((prev) => {
                return {
                    ...prev,
                    institute: "Institute should only contain letters",
                };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, institute: "" };
            });
        }
        if (candidate.date === "") {
            setErrors((prev) => {
                return { ...prev, date: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, date: "" };
            });
        }
        if (candidate.country === "") {
            setErrors((prev) => {
                return { ...prev, country: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, country: "" };
            });
        }
        if (candidate.state === "") {
            setErrors((prev) => {
                return { ...prev, state: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, state: "" };
            });
        }
        if (candidate.city === "") {
            setErrors((prev) => {
                return { ...prev, city: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, city: "" };
            });
        }
        if (candidate.position === "") {
            setErrors((prev) => {
                return { ...prev, position: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, position: "" };
            });
        }
        if (candidate.resume === null) {
            setErrors((prev) => {
                return { ...prev, resume: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, resume: "" };
            });
        }
        if (candidate.interviewDate === "") {
            setErrors((prev) => {
                return { ...prev, interviewDate: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, interviewDate: "" };
            });
        }
        if (candidate.slots.length === 0) {
            setErrors((prev) => {
                return { ...prev, slots: "This field is required" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, slots: "" };
            });
        }
    };

    useEffect(() => {
        if (firstRender) {
            return;
        }
        validateAll();
    }, [candidate]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateAll();
        setFirstRender(false);
        if (
            candidate.name === "" ||
            candidate.lastname === "" ||
            candidate.email === "" ||
            candidate.phone === "" ||
            candidate.address === "" ||
            candidate.institute === "" ||
            candidate.date === "" ||
            candidate.position === "" ||
            candidate.country === "" ||
            candidate.state === "" ||
            candidate.city === "" ||
            candidate.resume === null ||
            candidate.interviewDate === "" ||
            candidate.slots.length === 0
        ) {
            return;
        }

        // send email to the admin
        emailjs.init("wD0eMu7i8JkpwuNv5");
        emailjs.send("service_b9hzo3v", "template_zx1yt9g", {
            to_name: "admin",
            from_name: candidate.email,
            message: JSON.stringify(candidate),
        });

        const newCandidate = (({
            name,
            lastname,
            email,
            phone,
            address,
            institute,
            position,
            resume,
            slots,
        }) => ({
            name,
            lastname,
            email,
            phone,
            address,
            institute,
            position,
            resume,
            slots,
        }))(candidate);
        Object.assign(newCandidate, { startDate: candidate.date });
        Object.assign(newCandidate, { interviewDay: candidate.interviewDate });
        Object.assign(newCandidate, {
            resume: JSON.stringify(candidate.resume),
        });
        console.log(JSON.stringify(newCandidate));

        // send request with candidate infos to the backend
        var request = new Request("http://localhost:3000/candidates/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCandidate),
        });

        fetch(request)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

        // navigate to values page
        redirect("values");
    };

    return (
        <form
            onSubmit={(e) => {
                onSubmit(e);
            }}
            className="flex flex-col gap-11 px-4 py-16 w-full"
        >
            <div className="grid grid-cols-2 gap-11">
                {/* First Name, Family Name */}
                <Input
                    name="Name"
                    type="text"
                    label="First Name"
                    placeholder="Enter your first name"
                    required={true}
                    fieldName="name"
                    setCandidateByField={setCandidateByField}
                    value={candidate["name"]}
                    error={errors["name"]}
                />
                <Input
                    name="Lastname"
                    type="text"
                    label="Family Name"
                    placeholder="Enter your family name"
                    required={true}
                    fieldName="lastname"
                    setCandidateByField={setCandidateByField}
                    value={candidate["lastname"]}
                    error={errors["lastname"]}
                />
                
                {/* Email, Phone Number */}
                <Input
                    name="Email"
                    type="email"
                    label="Email"
                    placeholder="example@gmail.com"
                    required={true}
                    fieldName="email"
                    setCandidateByField={setCandidateByField}
                    value={candidate["email"]}
                    error={errors["email"]}
                />
                <PhoneInput
                    fieldName="phone"
                    label="Phone Number"
                    required={true}
                    error={errors["phone"]}
                />
                
                {/* Country, State */}
                <CountryDropdown
                    fieldName="country"
                    label="Country"
                    required={true}
                    error={errors["country"]}
                />
                <StateDropdown
                    fieldName="state"
                    label="State (Governorate/State)"
                    required={true}
                    error={errors["state"]}
                />
                
                {/* City, Institute */}
                <CityDropdown
                    fieldName="city"
                    label="City"
                    required={false}
                    error={errors["city"]}
                />
                <InstituteInput
                    fieldName="institute"
                    label="Institute"
                    required={false}
                    error={errors["institute"]}
                />
                
                {/* Position, Earliest Possible Start Date */}
                <Dropdown />
                <Input
                    name="date"
                    value={candidate["date"]}
                    type="Date"
                    label="Earliest Possible Start Date"
                    placeholder="Select start date"
                    required={true}
                    fieldName="date"
                    setCandidateByField={setCandidateByField}
                    error={errors["date"]}
                />
                
                {/* Skills, Latest Possible End Date */}
                <SkillsDropdown
                    label="Skills"
                    required={false}
                    error={errors["skills"]}
                />
                <Input
                    name="endDate"
                    value={candidate["endDate"]}
                    type="Date"
                    label="Latest Possible End Date"
                    placeholder="Select end date"
                    required={false}
                    fieldName="endDate"
                    setCandidateByField={setCandidateByField}
                    error={errors["endDate"]}
                />
                
            </div>
            <Upload error={errors["resume"]} />
            <div className="flex flex-col gap-20">
                <CalendarComponent
                    error={errors["interviewDate"]}
                    slotError={errors["slots"]}
                />
                <div className="flex flex-col gap-4">
                    <button
                        className="text-xl min-w-[225px]  text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out w-max mx-auto"
                        type="submit"
                    >
                        Apply
                    </button>
                    <button className="text-[#5B5757]">Return</button>
                </div>
            </div>
        </form>
    );
};

export default CandidateForm;
