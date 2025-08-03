import { useContext } from 'react';
import { ThemeActionsContext } from '../../app/context/themeActionsContext.ts';

export const useThemeActions = () => {
  const actionsContext = useContext(ThemeActionsContext);
  if (!actionsContext) throw new Error('Using hook out of provider');
  return actionsContext;
};
