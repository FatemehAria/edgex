import { readUploadedMediaFile } from '@/utils/read-uploaded-media';

import { intercepter, mock } from '../config';

mock.mock('/media/uploadedMedia', 'get', async () => {
  const uploadedMedia = await readUploadedMediaFile();

  return intercepter(uploadedMedia);
});
