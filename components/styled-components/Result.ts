import styled from "styled-components";


export const StyledResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    color: #121212;
    
    & span {
        font-size: 18px;
    }

    & > span {
        font-size: 30px;
        font-weight: bold;
    }
    
    & > span + span {
        font-size: 30px;
        margin: 10px auto;
        color: #0526df;
    }

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        font-weight: 600;
    }
`;