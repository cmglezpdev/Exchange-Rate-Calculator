import styled from "styled-components";


export const StyledResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 160px;
    color: #121212;
    
    & span {
        font-size: 18px;
    }

    & > span {
        font-size: 20px;
        font-weight: bold;
    }
    
    &  span.no-data-yet {
        font-size: 30px;
        margin: 10px auto;
        color: #0526df;
    }

    & > div.convert-result > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        font-weight: 500;
    }

    & > div.convert-result > span:first-child {
        font-size: 30px;
        font-weight: bold;
        color: #0526df;
    }

    @media (max-width: 640px) {
        &  span.no-data-yet, & > div.convert-result > span:first-child {
            font-size: 25px;
        }

        & > div.convert-result > div span {
            font-size: 16px;
        }

        & > div.convert-result > span:first-child {
            font-size: 23px;
        }
    }
`;