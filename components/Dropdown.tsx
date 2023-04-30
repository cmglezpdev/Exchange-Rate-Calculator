import { FC } from "react"
import { StyledDropdown } from "./styled-components"

import { currencies } from '@/data';

interface Props {
    value: string;
    changeValue: (value: string) => void;
}

export const Dropdown:FC<Props> = ({ value, changeValue }) => {
    return (
        <StyledDropdown>
            <div>{ value }</div>
            <ul>{
                Object.keys(currencies).sort().map(symbol => (
                    <li 
                        key={symbol}
                        onClick={() => changeValue(symbol)}
                    >
                    {`${symbol} - ${currencies[symbol]}`}</li>
                ))
            }</ul>
        </StyledDropdown>
    )
}
