import { ReactElement, ReactNode } from "react";

export interface TitleProps {
  children: ReactNode;
  tag?: keyof JSX.IntrinsicElements;
}

export const Title = (props: TitleProps): ReactElement => {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};
