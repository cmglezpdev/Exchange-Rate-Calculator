import styled from "styled-components";


export const Icon = styled.div`
    width: 40px;
    height: 40px;
    padding: 5px;
    background-color: azure;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
        width: 30px;
        height: 30px;
    }

    &:hover {
        cursor: pointer;
        background-color: aqua;
    }
`;