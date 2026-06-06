import { createContext, useContext } from 'react';


export interface TemplateNameContext {}

const TemplateNameContext = createContext<TemplateNameContext | undefined>(undefined);

export const useTemplateNameContext = () => {
  const context = useContext(TemplateNameContext);
  if (!context) {
    throw new Error('use TemplateNameContext must be used within a TemplateNameProvider');
  }
  return context;
};

interface TemplateNameProviderProps {
  children?: React.ReactNode;
}

export function TemplateNameProvider(props: TemplateNameProviderProps) {
  const { children } = props;

  const value: TemplateNameContext = {};

  return (
    <TemplateNameContext.Provider value={value}>
      {children}
    </TemplateNameContext.Provider>
  );
}
