import { createContext, useContext, useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { WithChildren } from "src/interfaces/common-props";

type SlideoverContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const SlideoverContext =
  createContext<SlideoverContextType | undefined>(undefined);

function SlideoverProvider({ children }: WithChildren): JSX.Element {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { open, setOpen };
  return (
    <SlideoverContext.Provider value={value}>
      {children}
    </SlideoverContext.Provider>
  );
}

function useSlideover(): SlideoverContextType {
  const context = useContext(SlideoverContext);
  if (context === undefined) {
    throw new Error("useSlideover must be used within a SlideoverProvider");
  }
  return context;
}

export { SlideoverProvider, useSlideover };
