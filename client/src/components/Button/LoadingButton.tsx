import React from "react";
import Styles from "./LoadingButton.module.css";
import 'tailwindcss/tailwind.css'; // Ensure this line exists


interface LoadingButtonProps {
  isLoading: boolean;
  
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, text, type, disabled = false}) => {
  
 

  return (
    <button
      type={type}
      className={`${isLoading || disabled ? "bg-green-700 cursor-default" : "bg-LLG hover:bg-LG"} border border-DG font-semibol rounded-full min-w-[82px] flex items-center justify-center w-full text-center text-DG h-12 py-2 px-4 focus:outline-none focus:shadow-outline`}
      disabled={disabled}
    >
      {isLoading ? (
        <div className={Styles.dotFlashing}>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};


export default LoadingButton;
