import { useContext } from 'react';
import { ActionsContext } from '../../app/context/actionsContext.ts';

export const useThemeActions = () => {
  const actionsContext = useContext(ActionsContext);
  if (!actionsContext) throw new Error('Using hook out of provider');
  return actionsContext;
};
