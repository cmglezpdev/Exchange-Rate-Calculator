import styled from "styled-components";


export const StyledLoader = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        display: block;
        width: 20px;
        height: 20px;
        position: relative;
        border-radius: 50%;
        color: #FF3D00;
        animation: fill 1s ease-in infinite alternate;
    }
    
    span::before , span::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        left: 30px;
        top: 0;
        animation: fill 0.9s ease-in infinite alternate;
    }

    span::after {
        left: auto;
        right: 30px;
        animation-duration: 1.1s;
    }

    @keyframes fill {
        0% {  box-shadow: 0 0 0 2px inset }
        100%{ box-shadow: 0 0 0 10px inset }
    }
`;