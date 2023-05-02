import '@testing-library/jest-dom';
import { act, getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '@/pages/index';

describe("Tests about Dropdown", () => {
    it("Dropdown should open and close", () => {
        render(<Home />);
        const fromDropdown = screen.getByTestId('from-dropdown');
        const ul = fromDropdown.querySelector("ul");
        expect(ul).toHaveStyle("display: none");

        userEvent.click(fromDropdown);
        waitFor(() => expect(ul).toHaveStyle("display: block"));

        expect(screen).toMatchSnapshot();
        
        userEvent.click(fromDropdown);
        waitFor(() => expect(ul).toHaveStyle("display: none"));
        
        expect(screen).toMatchSnapshot();
    })

    it("The button between the dropdowns should swap its values", async () => {
        render(<Home />);
        const fromDropdown = screen.getByTestId('from-dropdown');
        const toDropdown = screen.getByTestId('to-dropdown');
        
        // before swap
        expect(screen).toMatchSnapshot();
        
        await act(() => userEvent.click(toDropdown));
        const CUP_Option = getByTestId(toDropdown, 'CUP-option')
        userEvent.click(CUP_Option);
        waitFor(() => expect(toDropdown.firstChild?.textContent).toBe("CUP"));
    
        const swapButton = screen.getByTestId('swap-button');
        userEvent.click(swapButton);
        
        waitFor(() => {
            expect(fromDropdown.firstChild?.textContent).toBe("CUP");
            expect(toDropdown.firstChild?.textContent).toBe("USD");
        })

        // after swap
        expect(screen).toMatchSnapshot();
    })
})