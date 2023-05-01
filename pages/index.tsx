import { ChangeEvent, useState } from 'react';
import axios from 'axios';

import { AppLayout } from '@/layouts';
import { Dropdown, Loader, ShowResult } from '@/components';
import { 
  StyledButton, StyledContainer, 
  StyledLabel, StyledIcon, StyledGrid, 
  StyledInput
} from '@/components/styled-components';
import { ConvertResult, ConvertResponseAPI } from '@/interfaces';
import { formatNumber } from '@/helpers';


export default function Home() {

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("USD");

  const [result, setResult] = useState<ConvertResult>({
    currencyFrom: "USD", currencyTo: "USD",
    amount: "0", result: "0"
  })

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

  const onSwap = (from: string, to: string) => {
    setFrom(to); setTo(from);
  }

  const onConvert = async () => {
    if( amount === "" ) return;
    setShowLoader(true);

    try {
      const link = `api/convert?from=${from}&to=${to}&amount=${amount.replaceAll(",", "")}`;

      const response: Response = await fetch(link, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      });
      const converted: ConvertResponseAPI = await response.json();

      setResult({
        currencyFrom: from, currencyTo: to,
        result: formatNumber(`${converted.result}`),
        amount,
      });

    } catch (error:any) {
        console.log(error.message);
    }

    setShowLoader(false);
    // setTimeout(() => setShowLoader(false), 3000);
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
            placeholder='0'
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

        <StyledButton onClick={onConvert}>Convert</StyledButton>

        { showLoader ? <Loader /> : <ShowResult result={result} /> }
  
      </StyledContainer>
    </AppLayout>
  )
}
