import React, { useState } from "react";

const FloatingInput = ({
    label,
    type = "text",
    value,
    onChange,
    required,
    disabled,
    className = "",
    inputClassName = ""
}) => {

    const [focus, setFocus] = useState(false);
    const isActive = focus || value;

    return (
        <div className={`relative w-full ${className}`}>

            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={`w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 outline-none bg-white ${inputClassName}`}
            />

            <label
                className={`absolute left-3 px-1 transition-all duration-200
                ${isActive
                        ? "-top-2 text-sm text-blue-500 bg-white"
                        : "top-3 text-gray-400"
                    }`}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

        </div>
    )
}

export default FloatingInput;