import { handleError } from './handleError';
import { baseApi } from '../api/instance.ts';

export const fetchDefaultData = async (): Promise<
  DefaultResponse | BasicError
> => {
  try {
    const res = await baseApi.get<DefaultResponse>('/?limit=20&offset=0');
    return res.data;
  } catch (e) {
    return handleError(e);
  }
};
