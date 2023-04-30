import { FC } from 'react';
import { StyledResult } from '@/components/styled-components';
import { ConvertResult } from '@/interfaces';

interface Props {
    result: ConvertResult;
}

export const ShowResult:FC<Props> = ({ result : answer }) => {

    const { result, oneToFrom, oneFromTo, currencyFrom, currencyTo } = answer;

    return (
        <StyledResult>
            <span>Result</span>
            <span>{ `${result} ${currencyTo}` }</span>
            <div>
                <span>{`1 ${currencyFrom} = ${oneFromTo} ${currencyTo}`}</span>
                <span>{`1 ${currencyTo} = ${oneToFrom} ${currencyFrom}`}</span>
            </div>
        </StyledResult>
    )
}
