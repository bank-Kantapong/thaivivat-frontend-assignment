import { useState, useEffect } from "react";
import { useGetUserQuery, UserItemType } from "../api/apiSlice";

const useSearchData = (text: string) => {
  const [searchedData, setSearchedData] = useState([]);
  const { data: chracters, error, isLoading } = useGetUserQuery({});

  useEffect(() => {
    if (!isLoading && !error && chracters) {
      if (text) {
        const sortedData = chracters?.data
          ?.filter((item: UserItemType) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          )
          .sort((a: { name: string }, b: { name: string }) => {
            if (a.name.toLowerCase().startsWith(text.toLowerCase())) return -1;
            if (b.name.toLowerCase().startsWith(text.toLowerCase())) return 1;
            return 0;
          })
          .slice(0, 5);
        setSearchedData(sortedData);
      } else {
        setSearchedData([]);
      }
    }
  }, [chracters, error, isLoading, text]);

  return searchedData;
};

export default useSearchData;
