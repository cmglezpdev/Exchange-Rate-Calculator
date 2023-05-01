import { FC, useEffect, useRef, useState } from "react"
import { StyledDropdown } from "./styled-components"

import { currencies } from '@/data';

interface Props {
    value: string;
    changeValue: (value: string) => void;
}

export const Dropdown:FC<Props> = ({ value, changeValue }) => {
    
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if( dropdownRef.current && !dropdownRef.current.contains(e.target as Node) )
                setOpen(false);
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);

    }, [])
    
    useEffect(() => setOpen(false), [value]);

    return (
        <StyledDropdown ref={dropdownRef} onClick={() => setOpen(true)}>
            <div ref={valueRef}>{ value }</div>
            <ul style={{display: open ? "block" : "none"}}>{
                Object.keys(currencies).sort().map(symbol => (
                    <li 
                        key={symbol}
                        onClick={() => changeValue(symbol)}
                    >
                        <span>{`${symbol} - `}</span>
                        <span>{`${currencies[symbol]}`}</span>
                    </li>
                ))
            }</ul>
        </StyledDropdown>
    )
}
