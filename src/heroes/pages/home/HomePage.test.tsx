import { FavoriteHeroProvider } from '@/heroes/context/FavoriteHeroContext';
import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';

vi.mock('@/heroes/hooks/usePaginatedHero');

const mockedUsedPaginatedHero = vi.mocked(usePaginatedHero);

mockedUsedPaginatedHero.mockReturnValue({
    data: [],
    isError: false,
    isPending: false,
    isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );
};

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render HomePage with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('should call usePaginatedHero with default values', () => {
        renderHomePage();
        expect(mockedUsedPaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
    });

    test('should call usePaginatedHero with custom query params', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockedUsedPaginatedHero).toHaveBeenCalledWith(2, 10, 'villains');
    });

    test('should called usePaginatedHero with deault page and same limit on tab clicked', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        // const [allTabs, favoritesTab, heroesTab, villainsTab] = screen.getAllByRole('tab');
        const [, , , villainsTab] = screen.getAllByRole('tab');

        fireEvent.click(villainsTab);

        expect(mockedUsedPaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
    });
});
