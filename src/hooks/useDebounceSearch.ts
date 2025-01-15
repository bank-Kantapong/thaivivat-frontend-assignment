import { useState, useEffect } from "react";

const useDebouncedSearch = (searchText: string, delay = 500) => {
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [debouncedSearchText, setDebouncedSearchText] =
    useState<string>(searchText);

  useEffect(() => {
    if (searchText) {
      setIsLoadingSearch(true);
    }
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setIsLoadingSearch(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, delay]);

  return { debouncedSearchText, isLoadingSearch };
};

export default useDebouncedSearch;
