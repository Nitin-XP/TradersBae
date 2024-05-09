import React from "react";
const LoadingSpinner = ({ size = "lg" }) => {
    const sizeClass = `loading-${size}`;

    return <span className={`loading loading-spinner ${sizeClass}`} />;
};
export default LoadingSpinner;