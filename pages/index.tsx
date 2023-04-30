import { ChangeEvent, useState } from 'react';

import { AppLayout } from '@/layouts';
import { Dropdown, ShowResult } from '@/components';
import { 
  StyledButton, StyledContainer, 
  StyledLabel, StyledIcon, StyledGrid, 
  StyledInput
} from '@/components/styled-components';



export default function Home() {

  const [amount, setAmount] = useState<string>("");
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("USD");

  const isNumber = (number: string): boolean => {
    return number.split("").reduce((pv, c) => {
      const code = c.charCodeAt(0) - "0".charCodeAt(0);
      return (pv && code  >= 0 && code  <= 9);
    }, true);
  }

  const onCheck = (e : ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value;
    let n = value.length;
    if( value === "" ) {
      setAmount("");
      return;
    }

    const char = value[n - 1];
    if( !isNumber(char) && char !== "." ) return;
    // see if it have a point
    const pointIndex = value.split("").findIndex(c => c === ".");
    if( char === "." && pointIndex !== n - 1 ) return;
    
    setAmount(formatNumber(value));
  }


  const formatNumber = (number: string) : string => {
    const value = number.replaceAll(",", "");
    const n = value.length;
    let pointIndex = value.split("").findIndex(c => c === ".");
    pointIndex = pointIndex === -1 ? n : pointIndex;
    let newvalue = "";

    for(let i = pointIndex; i < n; i ++) newvalue += value[i];
    for(let j = 0, i = pointIndex - 1; i >= 0; i --, j ++) {
      newvalue = value[i] + ((j !== 0 && (j%3) === 0) ? "," : "") + newvalue;
    }

    return newvalue;
  }


  const onSwap = (from: string, to: string) => {
    setFrom(to); setTo(from);
  }

  return (
    <AppLayout>
      <StyledContainer>
        <div>
          <StyledLabel htmlFor="amount">Amount</StyledLabel>
          <StyledInput
            type="text"
            name='amount'
            onChange={onCheck}
            value={amount}
            autoComplete='off'
          />
        </div> 

        <StyledGrid>
          <div>
            <StyledLabel>From</StyledLabel>
              <Dropdown value={from} changeValue={setFrom} />
          </div>
          
          <StyledIcon onClick={() => onSwap(from, to)}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </StyledIcon>

          <div>
            <StyledLabel htmlFor='from'>To</StyledLabel>
            <Dropdown value={to} changeValue={setTo} />
          </div>

        </StyledGrid>

        <StyledButton>Convert</StyledButton>

        <ShowResult />

      </StyledContainer>
    </AppLayout>
  )
}
