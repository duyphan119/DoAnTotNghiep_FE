import { Box, SxProps } from "@mui/material";
import Link from "next/link";
import { CSSProperties, Fragment, memo } from "react";

type Props = Partial<{
  links: {
    label: string;
    href: string;
    style?: CSSProperties;
  }[];
  current: string;
  currentstyle: CSSProperties;
  sx: SxProps;
  currentWrap: boolean;
}>;

const Breadcrumbs = ({
  links,
  current,
  currentstyle,
  sx,
  currentWrap,
}: Props) => {
  const currentElement = <strong>{current}</strong>;
  return (
    <Box
      sx={{
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        ...sx,
      }}
    >
      {(links || []).map(({ label, href, style }, index) => {
        return (
          <Fragment key={label}>
            {index !== 0 ? <>&nbsp;&nbsp;/&nbsp;&nbsp;</> : ""}
            <Link
              href={href}
              style={{ cursor: "pointer", ...style }}
              className="text-hover"
            >
              {label}
            </Link>
          </Fragment>
        );
      })}
      {currentWrap ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 18,
            color: "var(--blue)",
            ...currentstyle,
          }}
        >
          {currentElement}
        </div>
      ) : (
        <Fragment>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <div
            style={{
              color: "var(--blue)",
              ...currentstyle,
            }}
          >
            {currentElement}
          </div>
        </Fragment>
      )}
    </Box>
  );
};

export default memo(Breadcrumbs);
