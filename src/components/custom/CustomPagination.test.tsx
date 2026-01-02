import { render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { CustomPagination } from './CustomPagination';

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => <button {...props}>{children}</button>,
}));

const renderWithRouter = (component: React.ReactElement, initialElements?: string[]) => {
    return render(<MemoryRouter initialEntries={initialElements}>{component}</MemoryRouter>);
};

describe('CustomPagination', () => {
    test('should render component with default values', () => {
        renderWithRouter(<CustomPagination totalPages={6} />);

        expect(screen.getByText('Anterior')).toBeDefined();
        expect(screen.getByText('Siguiente')).toBeDefined();

        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
        expect(screen.getByText('6')).toBeDefined();
    });

    test('should disabled previuos button when page is 1', () => {
        renderWithRouter(<CustomPagination totalPages={5} />);
        const previuosButton = screen.getByText('Anterior');
        expect(previuosButton.getAttributeNames()).toContain('disabled');
    });

    test('should disabled next button when we are in the last page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);
        const nextButton = screen.getByText('Siguiente');
        expect(nextButton.getAttributeNames()).toContain('disabled');
    });

    test('should disabled button 3 when we are in page 3', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);
        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');

        expect(button2.getAttribute('variant')).toBe('outline');
        expect(button3.getAttribute('variant')).toBe('default');
    });
});
