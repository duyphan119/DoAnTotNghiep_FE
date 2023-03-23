import SearchIcon from "@mui/icons-material/Search";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import { FC, FormEvent, useEffect, useRef } from "react";
import styles from "./_style.module.scss";
type Props = {
  onSearch: (q: string) => void;
};

const SearchWrapper: FC<Props> = ({ onSearch }) => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchInputRef.current ? searchInputRef.current.value : "";
    onSearch(q);
  };

  useEffect(() => {
    if (searchInputRef.current && router.query.q) {
      searchInputRef.current.value = `${router.query.q}`;
    }
  }, [router.query]);

  return (
    <form className={styles.searchWrapper} onSubmit={handleSearch}>
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          inputRef={searchInputRef}
          placeholder="Tìm kiếm"
        />
      </FormControl>
    </form>
  );
};

export default SearchWrapper;
