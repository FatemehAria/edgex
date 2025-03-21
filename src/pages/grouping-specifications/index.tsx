import type { MyFormOptions } from '@/components/core/form';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import GroupForm from './GroupForm';
import { getExistenceList } from './util';

interface GroupingSpecificationsProps {
  initialValues?: Record<string, any>; // Data for editing
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null; // Callback for form submission
  showButton?: boolean;
}

function GroupingSpecifications({ initialValues = {}, showButton = false, onSubmit }: GroupingSpecificationsProps) {
  const { formatMessage } = useLocale();

  return (
    <div className="form-container" style={{ overflow: 'hidden' }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.grouping.redirectionBtn' })}
        linkAddress="/main-tables/grouping-specifications/groups-list"
      />
      <GroupForm onSubmit={onSubmit} initialValues={initialValues} showButton={showButton} />
    </div>
  );
}

export default GroupingSpecifications;
