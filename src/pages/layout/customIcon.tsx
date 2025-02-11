import type { FC } from 'react';

import './customIcon.less';

import {
  faCirclePlus,
  faFileLines,
  faFolder,
  faHeart,
  faHouse,
  faMagnifyingGlassPlus,
  faPenToSquare,
  faTableList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
  const { type } = props;
  const { theme } = useSelector(state => state.global);
  let com = <FontAwesomeIcon icon={faHouse} />;

  if (type === 'homepage') {
    com = <FontAwesomeIcon icon={faHouse} />;
  } else if (type === 'account') {
    com = <FontAwesomeIcon icon={faUser} />;
  } else if (type === 'metadata') {
    com = <FontAwesomeIcon icon={faCirclePlus} />;
  } else if (type === 'advanced-search') {
    com = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />;
  } else if (type === 'reports') {
    com = <FontAwesomeIcon icon={faFolder} />;
  } else if (type === 'favorites') {
    com = <FontAwesomeIcon icon={faHeart} />;
  } else if (type === 'info submission') {
    com = <FontAwesomeIcon icon={faPenToSquare} />;
  } else if (type === 'main tables') {
    com = <FontAwesomeIcon icon={faTableList} />;
  } else if (type === 'proforma invoice') {
    com = <FontAwesomeIcon icon={faFileLines} />;
  }

  return <span className={`anticon ${theme === 'dark' ? 'icon-style-dark' : 'icon-style-light'}`}>{com}</span>;
};
