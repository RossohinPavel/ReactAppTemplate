import { TemplateNameContext } from "./context";


export function TemplateNameContextProvider({ children }: { children?: React.ReactNode }) {
  const value: TemplateNameContext = {};

  return (
    <TemplateNameContext.Provider value={value}>
      {children}
    </TemplateNameContext.Provider>
  );
}