import { FC } from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error' | 'loading';

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

const alertStyles = {
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  loading: 'bg-gray-100 text-gray-700 border-gray-200',
};

const iconStyles = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
  loading: (
    <div className="w-6 h-6 border-4 border-t-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
  ),
};

const Alert: FC<AlertProps> = ({ type, message, className }) => {
  return (
    <div
      className={`flex items-center p-4 rounded-lg border-l-4 ${alertStyles[type]} ${className}`}
    >
      <div className="mr-3">{iconStyles[type]}</div>
      <div className="text-sm font-medium">{message}</div>
    </div>
  );
};

export default Alert;
