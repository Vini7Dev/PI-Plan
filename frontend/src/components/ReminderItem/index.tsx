import React from 'react';
import { FiLayers, FiSettings, FiMail } from 'react-icons/fi';

import { Container } from './styles';

interface IReminderItemProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  reminder_type: 'contact_alert' | 'order' | 'installation';
}

// Componente para apresentar os lembretes do administrador
const ReminderItem: React.FC<IReminderItemProps> = ({
  id, title, subtitle, description, reminder_type,
}) => {
  return (
    <Container
      reminder_type={reminder_type}
    >
      {
        (function() {
          switch (reminder_type) {
            case 'order':
              return <FiLayers color="#A48760" size={35} />
            case 'installation':
              return <FiSettings color="#73A780" size={35} />
            case 'contact_alert':
              return <FiMail color="#7C56AF" size={35} />
            default:
              return <FiLayers color="#A48760" size={35} />
          }
        })()
      }
      <strong>{title}</strong>
      <span>{subtitle}</span>
      <p>{description}</p>
    </Container>
  );
}

export default ReminderItem;
