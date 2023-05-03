import styled from 'styled-components';


export const StyledDropdown = styled.div`
    cursor: default;
    color: #333;

    & > div {   
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        font-weight: bold;
        font-size: 20px;
        color: #000;
        background-color: #fff;
    }

    & > ul {
        display: none;
        position: absolute;
        list-style: none;
        z-index: 1;
        width: 165px;
        overflow-y: scroll;
        max-height: 300px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: default;
    }

    & > ul > li {
        width: 100%;
        padding: 10px;
        background-color: #fff;
    }

    & > ul > li > span:first-child {
        font-weight: bold;
        color: #000;
    }

    &:hover > ul > li:hover {
        background-color: #e7e7e7;   
    }

    @media (max-width: 640px) {
        & > ul {
            width: 180px;
        }
    }
`;
