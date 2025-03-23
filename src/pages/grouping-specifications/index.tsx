import { theme } from 'antd';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import GroupForm from './GroupForm';

interface GroupingSpecificationsProps {
  initialValues?: Record<string, any>; // Data for editing
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null; // Callback for form submission
  showButton?: boolean;
}

function GroupingSpecifications({ initialValues = {}, showButton = false, onSubmit }: GroupingSpecificationsProps) {
  const { formatMessage } = useLocale();
  const { token } = theme.useToken();

  return (
    <div className="form-container" style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.grouping.redirectionBtn' })}
        linkAddress="/main-tables/grouping-specifications/groups-list"
      />
      <GroupForm onSubmit={onSubmit} initialValues={initialValues} showButton={showButton} />
    </div>
  );
}

export default GroupingSpecifications;
