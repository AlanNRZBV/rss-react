import { createContext } from 'react';
import type { ActionsContext as ActionsContextType } from '../../types';

export const ActionsContext = createContext<ActionsContextType | null>(null);
