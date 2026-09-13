import React from 'react';
import { useCart } from '../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useCart();

  if (notifications.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {notifications.map((n) => (
        <div key={n.id} className={`toast toast-${n.type}`}>
          <span className="toast-icon">
            {n.type === 'success' ? '✓' : n.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="toast-message">{n.message}</span>
          <button
            className="toast-close"
            onClick={() => removeNotification(n.id)}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
