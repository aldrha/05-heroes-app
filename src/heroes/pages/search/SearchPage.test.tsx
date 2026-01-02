import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import SearchPage from './SearchPage';

vi.mock('@/heroes/actions/search-heroes.action');

const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    );
};

vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>,
}));

describe('SearchPage', () => {
    test('should render SearchPage and match to snapshopt', () => {
        const { container } = renderSearchPage();

        expect(container).toMatchSnapshot();
    });

    test('should render SearchPage with default values', () => {
        renderSearchPage();

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: '',
            strength: '0',
        });
    });
});
