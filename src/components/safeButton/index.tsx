import React, { useCallback } from "react";
import { useDebouncer } from "../../lib/hooks/useDebouncer";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  key?: number | string;
}

const SafeButton: React.FC<Props> = ({
  onClick,
  children,
  className,
  key
}) => {
  const safeClick = useDebouncer(onClick, 300);
  const onButtonClicked = useCallback(() => {
    safeClick();
  }, [safeClick]);

  return (
    <>
      <button key={key} onClick={onButtonClicked} className={className}>
        {children}
      </button>
    </>
  );
};

export default SafeButton;