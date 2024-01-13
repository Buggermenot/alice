interface CenterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CenterBox: React.FC<CenterBoxProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`grid place-content-center`}>
      {children}
    </div>
  );
};
