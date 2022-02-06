import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLayers, FiSettings, FiMail } from 'react-icons/fi';

import { Container } from './styles';
import getOrderProcessArray from '../../utils/getOrderProcessArray';
import parseDateStringToBrFormat from '../../utils/parseDateStringToBrFormat';

interface IReminderItemProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  reminder_type: 'contact_alert' | 'order' | 'installation';
  customer_id?: string;
  order_id?: string;
  installation_id?: string;
}

// Componente para apresentar os lembretes do administrador
const ReminderItem: React.FC<IReminderItemProps> = ({
  id, title, subtitle, description, reminder_type, customer_id, order_id, installation_id
}) => {
  const history = useHistory();

  // Navegando para a página do lembrete
  const handleNavigateToReminderPage = useCallback(() => {
    switch (reminder_type) {
      case 'order':
        history.push(`/order-data/${id}?customer_id=${customer_id}`);
        break;
      case 'installation':
        history.push(`/installation-data/${id}?order_id=${order_id}&customer_id=${customer_id}`);
        break;
      case 'contact_alert':
        history.push(`/customer-data/${id}`);
        break;
      default:
        alert('Lembrete inválido!');
    }
  }, [id, reminder_type, history]);

  return (
    <Container
      reminder_type={reminder_type}
      onClick={handleNavigateToReminderPage}
    >
      {
        (function () {
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
      <span>
        {
          reminder_type === 'order'
            ? getOrderProcessArray()[Number(subtitle)]
            : parseDateStringToBrFormat(subtitle)
        }
      </span>
      <p>{description}</p>
    </Container>
  );
}

export default ReminderItem;
