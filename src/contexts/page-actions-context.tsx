import React, { createContext, useContext, useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { WithChildren } from "src/interfaces/common-props";

type PageActionsContextType = {
  actions: React.ReactNode[];
  setActions: Dispatch<SetStateAction<React.ReactNode[]>>;
};
const PageActionsContext =
  createContext<PageActionsContextType | undefined>(undefined);

function PageActionsProvider({ children }: WithChildren): JSX.Element {
  const [actions, setActions] = useState<React.ReactNode[]>([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { actions, setActions };
  return (
    <PageActionsContext.Provider value={value}>
      {children}
    </PageActionsContext.Provider>
  );
}

function usePageActions(): PageActionsContextType {
  const context = useContext(PageActionsContext);
  if (context === undefined) {
    throw new Error("usePageActions must be used within a PageActionsProvider");
  }
  return context;
}

export { PageActionsProvider, usePageActions };
