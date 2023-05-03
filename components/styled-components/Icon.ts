import styled from "styled-components";


export const StyledIcon = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    margin: auto;
    margin-bottom: 0;
    border-radius: 100%;
    border: 1px solid #bbb;
    background-color: #f1f1f1;
    box-shadow: 0 0 4px 4px #eee;
    cursor: pointer;

    & > svg {
        font-size: 40px;
        color: #03213a;
    }

    @media (max-width: 640px) {
        width: 40px;
        height: 40px;
        margin-bottom: auto;

        & > svg {
            transform: rotate(90deg);
        }
    }
`;