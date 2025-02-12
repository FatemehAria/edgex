import { faIR_account } from './account';
import { faIR_advancedSearch } from './advanced-search';
import { fa_IR_component } from './component';
import { faIR_costumerInfo } from './costumer-info';
import { faIR_globalTips } from './global/tips';
import { faIR_groupingSpecifications } from './grouping-specifications';
import { faIR_home } from './home/index';
import { faIR_incDecFactors } from './inc-dec-factors';
import { fa_IR_metadata } from './metadata';
import { faIR_notice } from './notice';
import { faIR_permissionRole } from './permission/role';
import { faIR_personCompanyInfo } from './person-company-info';
import { faIR_productSupplier } from './poduct-supplier';
import { faIR_productInfo } from './product-info';
import { faIR_avatorDropMenu } from './user/avatorDropMenu';
import { fa_IR_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { faIR_title } from './user/title';

const fa_IR = {
  ...faIR_account,
  ...faIR_avatorDropMenu,
  ...fa_IR_tagsViewDropMenu,
  ...faIR_title,
  ...faIR_globalTips,
  ...faIR_permissionRole,
  ...faIR_advancedSearch,
  ...fa_IR_metadata,
  ...faIR_notice,
  ...fa_IR_component,
  ...faIR_home,
  ...faIR_groupingSpecifications,
  ...faIR_personCompanyInfo,
  ...faIR_costumerInfo,
  ...faIR_incDecFactors,
  ...faIR_productSupplier,
  ...faIR_productInfo,
};

export default fa_IR;
