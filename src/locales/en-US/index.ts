import { enUS_account } from './account';
import { enUS_advancedSearch } from './advanced-search';
import { en_US_component } from './component';
import { enUS_costumerInfo } from './costumer-info';
import { enUS_globalTips } from './global/tips';
import { enUS_groupingSpecifications } from './grouping-specifications';
import { enUs_home } from './home/index';
import { enUS_incDecFactors } from './inc-dec-factors';
import { en_US_metadata } from './metadata';
import { enUS_notice } from './notice';
import { enUS_permissionRole } from './permission/role';
import { enUS_personCompanyInfo } from './person-company-info';
import { enUS_productSupplier } from './poduct-supplier';
import { enUS_productInfo } from './product-info';
import { enUS_avatorDropMenu } from './user/avatorDropMenu';
import { enUS_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { enUS_title } from './user/title';

const en_US = {
  ...enUS_account,
  ...enUS_avatorDropMenu,
  ...enUS_tagsViewDropMenu,
  ...enUS_title,
  ...enUS_globalTips,
  ...enUS_permissionRole,
  ...enUS_advancedSearch,
  ...en_US_metadata,
  ...enUS_notice,
  ...en_US_component,
  ...enUs_home,
  ...enUS_groupingSpecifications,
  ...enUS_personCompanyInfo,
  ...enUS_productSupplier,
  ...enUS_costumerInfo,
  ...enUS_incDecFactors,
  ...enUS_productInfo,
};

export default en_US;
