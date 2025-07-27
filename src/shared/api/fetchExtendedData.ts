import { baseApi } from './instance.ts';
import { handleError } from '../helpers/handleError.ts';

export const fetchExtendedData = async (
  arg: string
): Promise<PokemonItem | BasicError> => {
  try {
    const res = await baseApi.get<PokemonItem>(`/${arg}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
