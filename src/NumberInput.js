import React from 'react';
import './NumberInput.css';

function isNumber(s) {
    return !isNaN(parseFloat(s)) && isFinite(s);
}

function NumberInput({ onChange, value, defaultValue, required = false, disabled = false, placeholder = '', className }) {
    const safe = n => (n === null || n === undefined) ? '' : n;

    const validatedOnChange = event => {
        const input = event.target;
        input.setCustomValidity(isNumber(input.value) ? '' : 'invalid');
        onChange(event);
    };

    if (value !== undefined) {
        return (
            <input
                type="text"
                className={'NumberInput ' + className}
                value={safe(value)}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                onChange={validatedOnChange}
            />
        );
    } else {
        return (
            <input
                type="text"
                className={'NumberInput ' + className}
                defaultValue={safe(defaultValue)}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                onChange={validatedOnChange}
            />
        );
    }
}

export default NumberInput;
