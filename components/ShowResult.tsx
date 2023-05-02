import { FC } from 'react';
import { StyledResult } from '@/components/styled-components';
import { ConvertResult } from '@/interfaces';
import { formatNumber } from '@/helpers';

interface Props {
    result: ConvertResult;
}

export const ShowResult:FC<Props> = ({ result : answer }) => {

    const { amount, result } = answer;

    return (
        <StyledResult data-testid="result-zone">
            <span>Result</span>
            { 
                amount === "0" || result === "0" 
                ? (<NotInformation />)
                : (<ConvertData result={answer} />)
            }
        </StyledResult>
    )
}

const NotInformation = () => {
    return (
        <span>No Data yet</span>
    )
}

const ConvertData:FC<Props> = ({ result: answer }) => {

    const { amount, result, currencyFrom, currencyTo } = answer;

    const oneFromTo = (): string => {
        const amount_number = parseFloat(amount.replaceAll(",", ""));
        const result_number = parseFloat(result.replaceAll(",", ""));
        return formatNumber((result_number/amount_number).toString(), 6);
    }

    const oneToFrom = (): string => {
        const amount_number = parseFloat(amount.replaceAll(",", ""));
        const result_number = parseFloat(result.replaceAll(",", ""));
        return formatNumber((amount_number/result_number).toString(), 6);
    }

    return (
        <div data-testid='result'>
            <span>{ `${result} ${currencyTo}` }</span>
            <div>
                <span>{`1 ${currencyFrom} = ${oneFromTo()} ${currencyTo}`}</span>
                <span>{`1 ${currencyTo} = ${oneToFrom()} ${currencyFrom}`}</span>
            </div>
        </div>
    )
}