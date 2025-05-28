import React from "react";

const Orb = ({ label = "", className = "" }) => (
  <div className={`orb-container ${className}`}>
    <div className="orb-label">{label}</div>
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="orbGradient" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#orbGradient)"
        stroke="currentColor"
        strokeWidth=".2"
      />
    </svg>
  </div>
);

export default Orb;
