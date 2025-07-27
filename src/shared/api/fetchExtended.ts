import { baseApi } from './instance.ts';
import { handleError } from '../helpers/handleError.ts';
import type { BasicError, PokemonExtended } from '../../types';

export const fetchExtended = async (
  arg: string
): Promise<PokemonExtended | BasicError> => {
  try {
    const res = await baseApi.get<PokemonExtended>(`/${arg}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
