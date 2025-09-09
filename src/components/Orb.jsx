import React from "react";

const Orb = ({
  label = "",
  description = "",
  url = "",
  github = "",
  className = "",
  onOrbPressed,
  index,
}) => {
  const gradientId = `orbGradient-${label.replace(/\s+/g, "-")}`;

  return (
    <div
      className={`orb-container ${className}`}
      onClick={() => onOrbPressed(label, description, url, github)}
      style={{ "--i": `${index}` }}
    >
      <div className="orbit">
        <div className="orb-label">{label}</div>
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          style={{ display: "block" }}
        >
          <defs>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity=".9" />
            </radialGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="50"
            fill={`url(#${gradientId})`}
            stroke="currentColor"
            strokeWidth=".2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Orb;