import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <button className="border-none cursor-pointer" onClick={() =>{navigate("/")}}>
      <div className="flex flex-row items-center justify-start ml-15 mt-15">
          <div>
              <img src="/Logo_Ascom.svg" alt="Logo Ascom" className="w-auto h-8 mx-auto mb-4" />
          </div>
          <div className="mx-4">
              <img src="/x-thin.svg" alt="x" className="w-auto h-6 mx-auto mb-4" />
          </div>
          <div>
              <img src="/42_Logo.svg" alt="Logo 42" className="w-auto h-8 mx-auto mb-4" />
          </div>
      </div>
    </button>
  );
}

export default Logo;