import { Breadcrumbs as MuiBreadcrumbs, SxProps } from "@mui/material";
import Link from "next/link";
import { CSSProperties } from "react";

type Props = Partial<{
  links: {
    label: string;
    href: string;
    style?: CSSProperties;
  }[];
  current: string;
  currentstyle: CSSProperties;
  sx: SxProps;
}>;

const Breadcrumbs = ({ links, current, currentstyle, sx }: Props) => {
  return (
    <MuiBreadcrumbs sx={{ fontSize: "14px", ...sx }}>
      {(links || []).map(({ label, href, style }) => {
        return (
          <Link
            href={href}
            style={{ cursor: "pointer", ...style }}
            key={label}
            className="text-hover"
          >
            {label}
          </Link>
        );
      })}
      <strong style={currentstyle}>{current}</strong>
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
