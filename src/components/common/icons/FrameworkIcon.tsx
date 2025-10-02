import type { FrameworkIconProps } from "@/types/ui";

export function FrameworkIcon({ framework, size = 24, className = "" }: FrameworkIconProps) {
  const iconProps = {
    width: size,
    height: size,
    className: `inline-block ${className}`,
  };

  switch (framework) {
    case "angular":
      return (
        <img
          {...iconProps}
          src="/src/assets/icons/angular-icon.svg"
          alt="Angular"
          className={`${iconProps.className} object-contain`}
        />
      );
    case "react":
      return (
        <img
          {...iconProps}
          src="/src/assets/icons/react-js-icon.svg"
          alt="React"
          className={`${iconProps.className} object-contain`}
        />
      );
    case "nextjs":
      return (
        <img
          {...iconProps}
          src="/src/assets/icons/nextjs-icon.svg"
          alt="Next.js"
          className={`${iconProps.className} object-contain`}
        />
      );
    case "redux":
      return (
        <img
          {...iconProps}
          src="/src/assets/icons/redux-icon.svg"
          alt="Redux"
          className={`${iconProps.className} object-contain`}
        />
      );
    case "random":
      return (
        <img
          {...iconProps}
          src="/src/assets/icons/random-icon.svg"
          alt="Random"
          className={`${iconProps.className} object-contain`}
        />
      );
    default:
      return (
        <div
          {...iconProps}
          className={`${iconProps.className} flex items-center justify-center rounded bg-gray-300 text-xs font-bold`}
        >
          ?
        </div>
      );
  }
}

export default FrameworkIcon;
