import { useSearchParams } from 'react-router';

export const useSearchParamsHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  return {
    searchParams,
    activeTab,
    page,
    limit,
    category,

    setSearchParams,
  };
};
