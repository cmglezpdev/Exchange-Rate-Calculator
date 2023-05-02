import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '@/pages/index';

describe("Tests about Amount Input", () => {
    it("should update the input value correctly", () => {
        render(<Home />)
        const input:HTMLInputElement = screen.getByTestId('input-amount');

        userEvent.type(input, "45a56.7bs.34");
        waitFor(() => expect(input).toHaveValue("4,556.734"))
        
        expect(screen).toMatchSnapshot();
    })
})