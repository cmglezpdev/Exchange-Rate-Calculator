import styled from 'styled-components';

export const StyledContainer = styled.section`
    width: 450px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    background-color: #faf9f9;

    box-shadow: 0 0 7px 7px #ddd;

    @media (max-width: 640px) {
        width: 300px;
    }
`;

