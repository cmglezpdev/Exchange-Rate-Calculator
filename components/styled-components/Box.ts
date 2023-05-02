import styled from "styled-components";

export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 70px 1fr;
    gap: 5px;
    align-items: end;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 50px 1fr;

        & div.div-from, & div.div-to {
            display: grid;
            grid-template-columns: 70px 1fr;
            gap: 5px;
            align-items: center;
        }
    }
`;