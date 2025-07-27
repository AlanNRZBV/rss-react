import { handleError } from '../helpers/handleError.ts';
import { baseApi } from './instance.ts';
import type { BasicError, DefaultResponse } from '../../types';

export const fetchDefaultData = async (): Promise<
  DefaultResponse | BasicError
> => {
  try {
    const res = await baseApi.get<DefaultResponse>('/?limit=10&offset=0');
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
