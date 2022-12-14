import { Input } from 'antd';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import styles from './search-field.module.css';
import { debounce } from '../../utils/debounce';

type SearchFieldProps = {
  search: (term: string) => void;
  resetSearch: () => void;
};

const SearchField = ({ search, resetSearch }: SearchFieldProps) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const debouncedSearch = useMemo(() => {
    return debounce(500, (term) => {
      if (term !== '') {
        search(term.toLowerCase());
      } else {
        resetSearch();
      }
    });
  }, [search, resetSearch]);

  useEffect(() => {
    if (searchTerm !== undefined) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, search, resetSearch, debouncedSearch]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return <Input placeholder="Search ..." className={styles.field} value={searchTerm} onChange={handleInput} />;
};

export const MemoizedSearchField = React.memo(SearchField);
