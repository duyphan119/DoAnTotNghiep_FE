import React, { useEffect } from "react";

type Props = Partial<{
  title: string;
}>;

const NotFound = ({ title }: Props) => {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
  return <div>NotFound</div>;
};

export default NotFound;
