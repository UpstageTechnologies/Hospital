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
    return (
        <div className={`relative w-full ${className}`}>

            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                placeholder=" "
                className={`peer w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white ${inputClassName}`}
            />

            <label className="absolute left-3 top-2 text-gray-500 text-sm bg-white px-1 transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

        </div>
    )
}

export default FloatingInput