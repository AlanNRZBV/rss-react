import { handleError } from '../helpers/handleError.ts';
import { baseApi } from './instance.ts';
import type { BasicError, DefaultResponse } from '../../types';

export const fetchPage = async (
  arg: string
): Promise<DefaultResponse | BasicError> => {
  try {
    const res = await baseApi.get<DefaultResponse>(`/${arg}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
