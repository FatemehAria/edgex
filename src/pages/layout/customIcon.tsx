import type { FC } from 'react';

import './customIcon.less';

import {
  faCirclePlus,
  faFile,
  faHeart,
  faHouse,
  faMagnifyingGlassPlus,
  faPenToSquare,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

// import { ReactComponent as AccountSvg } from '@/assets/menu/account.svg';
// import { ReactComponent as AdvancedSearchSvg } from '@/assets/menu/advanced-search.svg';
// Account Svg
// import { ReactComponent as DashboardSvg } from '@/assets/menu/dashboard.svg';
// import { ReactComponent as FavoritesSvg } from '@/assets/menu/favorites.svg';
// import { ReactComponent as GuideSvg } from '@/assets/menu/guide.svg';
// import { ReactComponent as HomePageSvg } from '@/assets/menu/homepage.svg';
// import { ReactComponent as MetadataSvg } from '@/assets/menu/metadata.svg';
// import { ReactComponent as ReportsSvg } from '@/assets/menu/reports.svg';

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
    com = <FontAwesomeIcon icon={faFile} />;
  } else if (type === 'favorites') {
    com = <FontAwesomeIcon icon={faHeart} />;
  } else if (type === 'info submission') {
    com = <FontAwesomeIcon icon={faPenToSquare} />;;
  }
  // else {
  //   com = <GuideSvg />;
  // }

  return <span className={`anticon ${theme === 'dark' ? 'icon-style-dark' : 'icon-style-light'}`}>{com}</span>;
};
