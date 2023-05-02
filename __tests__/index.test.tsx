import '@testing-library/jest-dom';
import { act, getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '@/pages/index';

describe("Tests about Home Page", () => {
    
    
    it("should render the page", () => {
        render(<Home />);
        // Input
        screen.getByText('Amount');
        screen.getByTestId('input-amount');

        // Dropdown
        screen.getByText('From');
        screen.getByTestId('from-dropdown');
        screen.getByText('To');
        screen.getByTestId('to-dropdown');

        // swap button
        screen.getByTestId('swap-button');

        // result zone 
        screen.getByText('No Data yet');

        // screenShot
        expect(screen).toMatchSnapshot();

    })

    it("should convert correctly two currencies", async () => {
        render(<Home />);
        const input:HTMLInputElement = screen.getByTestId('input-amount');
        const toDropdown = screen.getByTestId('to-dropdown');
    
        userEvent.type(input, "5342.013");
        waitFor(() => expect(input).toHaveValue("5,342.013"));
        
        await act(() => userEvent.click(toDropdown));
        const CUP_Option = getByTestId(toDropdown, 'CUP-option');
        await act(() => userEvent.click(CUP_Option));

        const convertButton = screen.getByText('Convert');
        await act(() => userEvent.click(convertButton));
    
        const result = screen.getByTestId('result-zone');
        expect(result).toBeInTheDocument();
    })
})