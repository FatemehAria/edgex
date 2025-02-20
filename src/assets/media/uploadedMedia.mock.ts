import { intercepter, mock } from '@/mock/config';
import { readUploadedMediaFile } from '@/utils/read-uploaded-media';

mock.mock('/media/uploadedMedia', 'get', async () => {
  const uploadedMedia = await readUploadedMediaFile();

  return intercepter(uploadedMedia);
});
