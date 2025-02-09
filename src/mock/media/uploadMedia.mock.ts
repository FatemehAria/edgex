import { intercepter, mock } from '../config';

export const fileDataBase: any = [];

mock.mock('/media/uploadMedia', 'post', (config: any) => {
  const formDataString = config.body.toString();
  const formDataObject: any = {};

  formDataString.split('&').forEach((element: any) => {
    const [key, value] = element.split('=');

    console.log(key);
    console.log(value);
    formDataObject[key] = decodeURIComponent(value);
  });
  const fileId = mock.Random.guid();
  const fileRecord = { id: fileId, ...formDataObject };

  fileDataBase.push(fileRecord);

  return intercepter({
    message: 'upload successful',
    data: fileRecord,
  });
});
