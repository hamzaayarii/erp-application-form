import { BsCheck2All } from "react-icons/bs"
import mission from "../assets/mission.png"

const Values = () => {
  return (
    <div className="container mx-auto px-52">
      <div className="text-center flex flex-row items-center justify-center gap-4 pt-4">
        <BsCheck2All className="text-green-500" />
        <h1 className="text-xl text-[#595959]">Your application has been successfully submitted</h1>
      </div>
      <div className="flex flex-col items-center mt-6 py-8 gap-6">
        <img src={mission} alt="mission" className="" />
        <div className="flex flex-row justify-around text-center gap-16 text-[#718096]">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores debitis odit et neque dicta veritatis, quas quis, nostrum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores debitis odit et neque dicta veritatis, quas quis, nostrum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores debitis odit et neque dicta veritatis, quas quis, nostrum</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <a href="https://3sspring.com/" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Visit our site
        </a>
      </div>
    </div>
  )
}

export default Values