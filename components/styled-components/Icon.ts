import styled from "styled-components";


export const StyledIcon = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    margin: auto;
    margin-bottom: 0;
    border-radius: 100%;
    border: 1px solid #ccc;
    background-color: #eee;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
        background-color: aqua;
    }

    & > svg {
        font-size: 40px;
    }
`;