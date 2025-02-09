import fs from 'fs';
import path from 'path';

export const readUploadedMediaFile = (): any[] => {
  const filePath = path.join(__dirname, 'uploads', 'uploadedFiles.json');
  let uploadedMedia = [];

  try {
    const data = fs.readFileSync(filePath, 'utf-8');

    uploadedMedia = JSON.parse(data);
  } catch (error) {
    console.error('Error reading uploaded files:', error);
  }

  return uploadedMedia;
};
