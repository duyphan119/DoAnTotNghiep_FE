import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, ClickAwayListener, IconButton, Popper } from "@mui/material";
import { FC, FormEvent, memo, MouseEvent, useRef, useState } from "react";
import ButtonControl from "../ButtonControl";
import styles from "./_style.module.scss";

type Props = {
  onChangePage: (page: number) => void;
  page: number;
  totalPage: number;
};

const Pagination: FC<Props> = ({ onChangePage, page, totalPage }) => {
  const [openPopper, setOpenPopper] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const goToRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopper((state) => !state);
  };

  const handleGoToPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (goToRef.current) {
      const page = +goToRef.current.value;
      if (page > 0 && page <= totalPage) {
        onChangePage(page);
        setOpenPopper(false);
        // setIds([]);
      }
    }
  };

  return (
    <Box display="flex">
      <IconButton onClick={() => onChangePage(page - 1)} disabled={page <= 1}>
        <ChevronLeftIcon />
      </IconButton>
      <ButtonControl
        variant="text"
        onClick={handleClick}
        disabled={totalPage <= 1}
      >
        Trang {page} / {totalPage || 1}
      </ButtonControl>
      {openPopper ? (
        <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
          <Popper open={openPopper} anchorEl={anchorEl}>
            <Box
              sx={{
                border: 1,
                p: 1,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "12px",
              }}
            >
              <span>Đi tới trang</span>
              <form onSubmit={handleGoToPage}>
                <input
                  type="number"
                  ref={goToRef}
                  className={styles.goToPageInput}
                />
              </form>
            </Box>
          </Popper>
        </ClickAwayListener>
      ) : null}

      <IconButton
        onClick={() => onChangePage(page + 1)}
        disabled={page >= totalPage}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default memo(Pagination);
