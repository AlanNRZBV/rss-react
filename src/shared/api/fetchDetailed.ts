import { baseApi } from './instance.ts';
import { handleError } from '../helpers/handleError.ts';
import type { BasicError, PokemonDetailed } from '../../types';

export const fetchDetailed = async (
  arg: string
): Promise<PokemonDetailed | BasicError> => {
  try {
    const res = await baseApi.get<PokemonDetailed>(`/${arg}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
