import styled from "styled-components";


export const StyledInput = styled.input`
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    font-size: 20px;
    border: 1px solid #ccc;
    color: #333;

    &:focus {
        outline: none;
        border: 1px solid #0cf;
    }
`