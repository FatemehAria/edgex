import './index.less';

import { faArrowDown19, faArrowUp19 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Image, Row, Typography } from 'antd';
import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FileUploadGif from '@/assets/home/file-upload-bgremoved-gif2.gif';
import UplodIllustration from '@/assets/home/upload3-main.png';
import { LocaleFormatter } from '@/locales';
import { fileAddition } from '@/stores/files.store';

import { SearchContext } from './context/SearchContext';

function Home() {
  const { searchInput } = useContext(SearchContext);
  const { files } = useSelector(state => state.files);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    const filesWithPreviews = acceptedFiles.map((file: any) => ({
      media_id: Math.random().toString(16).slice(2),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      preview: URL.createObjectURL(file),
    }));

    dispatch(fileAddition({ files: filesWithPreviews }));
    // if (acceptedFiles?.length !== 0) {
    //   setFiles(last => [
    //     ...last,
    //     ...acceptedFiles.map((item: any) => Object.assign(item, { preview: URL.createObjectURL(item) })),
    //   ]);
    // }
  }, []);

  console.log(files);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  return (
    <div className="main-container">
      <div
        {...getRootProps({
          className: 'drag-and-drop-container',
        })}
      >
        <input {...getInputProps()} />
        <div
          // className={`drag-and-drop-field`}
          className={`drag-and-drop-field ${
            theme === 'dark' ? 'drag-and-drop-show-field-dark' : 'drag-and-drop-show-field-light'
          } ${isDragActive ? 'drag-and-drop-show-field' : 'drag-and-drop-hide-field'}
           `}
        >
          <div className="drag-and-drop-content">
            <p className="drag-and-drop-text">
              <LocaleFormatter id="app.home.dragAndDropText" />
            </p>
            <Image src={FileUploadGif} alt="upload-gif" className="drag-and-drop-gif" preview={false} />
          </div>
        </div>
      </div>
      {files?.length === 0 ? (
        <div className="main-text-container">
          <img src={UplodIllustration} alt="nothing to show" className="main-text-image" />
          <Typography className="main-text">
            <LocaleFormatter id="app.home.noFiles" />
          </Typography>
        </div>
      ) : (
        <div>
          <Typography className="media-content-header">
            <LocaleFormatter id="app.home.uploadedFilesTitle" />
            {/* Sort by time icon */}
            {
              <FontAwesomeIcon
                icon={sortByDateAsc ? faArrowUp19 : faArrowDown19}
                onClick={() => setSortByDateAsc(last => !last)}
                className="show-sort-icon"
              />
            }
          </Typography>
          <Row align="middle" justify="end" wrap={true} gutter={[10, 15]}>
            {files
              .filter(item => item.name.includes(searchInput))
              .sort((x, y) => (sortByDateAsc ? x.lastModified - y.lastModified : y.lastModified - x.lastModified))
              .map(file => (
                <Col span={6} key={file.name}>
                  <Card size="small" bordered={true}>
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="uploaded-files"
                      onClick={() => navigate(`/${file.media_id}`)}
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Home;
