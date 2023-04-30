import { useEffect, useState } from "react"
import { StyledDropdown } from "./styled-components"
import { Symbol } from "@/interfaces";

import { currencies } from '@/data';

export const Dropdown = () => {

    // const [currencies, setCurrencies] = useState<Symbol>();

    return (
        <StyledDropdown>
            <div>Select</div>
            <ul>{
                Object.keys(currencies).sort().map(symbol => (
                    // <li key={symbol}>{ symbol }</li>
                    <li key={symbol}>{`${symbol} - ${currencies[symbol]}`}</li>
                ))
            }</ul>
        </StyledDropdown>
    )
}
