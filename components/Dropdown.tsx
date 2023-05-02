import { FC, useEffect, useRef, useState } from "react"
import { StyledDropdown } from "./styled-components"

import { currencies } from '@/data';

interface Props {
    value: string;
    changeValue: (value: string) => void;
    "data-testid"?: string;
}

export const Dropdown:FC<Props> = ({ value, changeValue, ...restProps }) => {
    
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
        <StyledDropdown ref={dropdownRef} onClick={() => setOpen(true)} data-testid={restProps['data-testid'] || ''}>
            <div ref={valueRef}>{ value }</div>
            <ul style={{display: open ? "block" : "none"}}>{
                Object.keys(currencies).sort().map(symbol => (
                    <li 
                        key={symbol}
                        onClick={() => changeValue(symbol)}
                        data-testid={`${symbol}-option`}
                    >
                        <span>{`${symbol} - `}</span>
                        <span>{`${currencies[symbol]}`}</span>
                    </li>
                ))
            }</ul>
        </StyledDropdown>
    )
}
