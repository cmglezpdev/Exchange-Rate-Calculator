import styled from "styled-components";


export const StyledResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    & span {
        font-size: 18px;
    }

    & >span {
        font-size: 20px;
        font-weight: bold;
    }

    & > span + span {
        font-size: 30px;
        margin: 10px auto;
    }

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
    }
`;