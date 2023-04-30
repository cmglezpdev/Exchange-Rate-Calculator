import styled from 'styled-components';


export const StyledDropdown = styled.div`
    & > div {
        width: 100%;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 15px 10px;
        font-weight: bold;
        font-size: 20px;
    }

    & > ul {
        display: none;
        position: absolute;
        list-style: none;
        width: 190px;
    }

    &:hover > ul {
        display: block;
    }

    & > ul > li {
        width: 100%;
        padding: 15px 10px;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        background-color: #fff;
    }

    &:hover > ul > li:hover {
        background-color: red;
        color: blue;
    }
`;
