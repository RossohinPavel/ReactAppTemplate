import { createContext } from "react";


export interface TemplateNameContext {}

export const TemplateNameContext = createContext<TemplateNameContext | undefined>(undefined);
