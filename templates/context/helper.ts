import { useContext } from "react";
import { TemplateNameContext } from "./context";


export const useTemplateNameContext = () => {
  const context = useContext(TemplateNameContext);
  if (!context) {
    throw new Error("use TemplateNameContext must be used within a TemplateNameProvider");
  }
  return context;
};