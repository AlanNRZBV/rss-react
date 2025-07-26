import { baseApi } from '../api/instance.ts';
import { handleError } from './handleError.ts';

export const fetchExtendedData = async (
  arg: string
): Promise<PokemonExtended | BasicError> => {
  try {
    const res = await baseApi.get<PokemonExtended>(`/${arg}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
