import React from "react";
import AngularIconSvg from "../../assets/icons/angular-icon.svg";
import ReactIconSvg from "../../assets/icons/react-js-icon.svg";
import NextJSIconSvg from "../../assets/icons/nextjs-icon.svg";
import ReduxIconSvg from "../../assets/icons/redux-icon.svg";
import RandomIconSvg from "../../assets/icons/random-icon.svg";
import type { FrameworkIconProps } from "../../types";

export const FrameworkIcon: React.FC<FrameworkIconProps> = ({
  framework,
  size = 24,
  className = "",
}) => {
  const iconStyle = {
    width: size,
    height: size,
  };

  switch (framework) {
    case "angular":
      return <img src={AngularIconSvg} alt="Angular" style={iconStyle} className={className} />;
    case "react":
      return <img src={ReactIconSvg} alt="React" style={iconStyle} className={className} />;
    case "nextjs":
      return <img src={NextJSIconSvg} alt="Next.js" style={iconStyle} className={className} />;
    case "redux":
      return <img src={ReduxIconSvg} alt="Redux" style={iconStyle} className={className} />;
    case "random":
      return <img src={RandomIconSvg} alt="Random" style={iconStyle} className={className} />;
    default:
      return <div className={`rounded bg-gray-300 ${className}`} style={iconStyle} />;
  }
};
