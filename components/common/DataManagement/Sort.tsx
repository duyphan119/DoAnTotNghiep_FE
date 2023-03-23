import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, memo } from "react";
type Props = {
  onChange: (value: string) => void;
  sorts: Array<{
    label: string;
    sortBy: string;
    sortType: "ASC" | "DESC";
  }>;
  value: string;
};

const Sort: FC<Props> = ({ onChange, sorts, value }) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(e.target.value);
  };
  return (
    <FormControl size="small" sx={{ minWidth: "200px" }}>
      <InputLabel>Sắp xếp theo</InputLabel>
      <Select value={value} label="Sắp xếp theo" onChange={handleChange}>
        {sorts.map((sortItem) => {
          return (
            <MenuItem
              key={sortItem.label}
              value={`${sortItem.sortBy}-${sortItem.sortType}`}
            >
              {sortItem.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default memo(Sort);
