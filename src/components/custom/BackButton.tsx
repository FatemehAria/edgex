import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <FontAwesomeIcon
      icon={faArrowLeft}
      onClick={() => navigate(-1)}
      fontSize={13}
      fontWeight={700}
      color="#ffffff"
      cursor="pointer"
      style={{ padding: '0.5rem', backgroundColor: '#2f7d32', borderRadius: '50%' }}
    />
  );
}

export default BackButton;
