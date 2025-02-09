import type { GetMediaResult } from '@/interface/media.interface';

import { request } from './request';

/** get media list api */
export const apiGetMediaList = () => request<GetMediaResult>('get', '/media/uploadedMedia');

/** upload Files */
export const apiUploadMedia = (data: any) => request<any>('post', '/media/uploadMedia', data);
