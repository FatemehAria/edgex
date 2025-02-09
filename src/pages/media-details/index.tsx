import './index.less';

import { faCalendarDays, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExifReader from 'exifreader';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LocaleFormatter } from '@/locales';

import Map from './Map';
import PageDetailNav from './PageDetailNav';

function MediaDetails() {
  const { media_id } = useParams();
  const { files } = useSelector((state: any) => state.files);
  const [metadata, setMetadata] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const { locale } = useSelector(state => state.user);
  const [latitude, setLatitude] = useState();
  const [longitude, setLangitude] = useState();
  let position;

  const readMetadata = async (file: any) => {
    try {
      const response = await fetch(file.preview);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const tags = await ExifReader.load(arrayBuffer, {
        expanded: true,
        includeUnknown: true,
      });

      setMetadata(tags);
      console.log('Metadata:', tags);
    } catch (error) {
      console.error('Error reading metadata:', error);
    }
  };

  useEffect(() => {
    const selectedFile = files.find((file: any) => file.media_id === media_id);

    if (selectedFile) {
      localStorage.setItem('M_id', media_id as string);
      setFileName(selectedFile.name);
      readMetadata(selectedFile);
    }
  }, [files, media_id]);

  useEffect(() => {
    if (metadata) {
      setLangitude(metadata.gps?.Longitude);
      setLatitude(metadata.gps?.Latitude);
    }

    position = [latitude, longitude];
  }, [metadata]);

  return (
    <div>
      <PageDetailNav />
      <div className="media-detail-container" dir="rtl">
        {/* Metadata */}
        {metadata && (
          <div className="metadata-container">
            <p className={`${locale === 'en_US' ? 'metadata-title-en' : 'metadata-title-fa'}`}>
              <LocaleFormatter id="app.home.mediaDetailPageTitle" />
            </p>
            {/* File Name */}
            <div className="metadata-item-container">
              <p className="metadata-icon-container">
                <FontAwesomeIcon icon={faImage} />
              </p>
              <p className="metadata-item-text">{fileName}</p>
              <span></span>
            </div>
            {/* Original DateTime */}
            {metadata?.exif?.DateTimeOriginal?.description && (
              <div className="metadata-item-container">
                <p className="metadata-icon-container">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </p>
                <p className="metadata-item-text">{metadata?.exif?.DateTimeOriginal?.description}</p>
              </div>
            )}
            {/* Map */}
            {metadata.gps && <Map lang={longitude} lat={latitude} />}
          </div>
        )}
        {/* Image */}
        {files
          .filter((file: any) => file.media_id === media_id)
          .map((item: any) => (
            <div key={item.name} className="image-container">
              <img src={item.preview} alt={item.name} className="media-as-image" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default MediaDetails;
