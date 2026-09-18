import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
        let border = 'border-blue-200';
        let bg = 'bg-white';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
          border = 'border-emerald-200';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
          border = 'border-rose-200';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
          border = 'border-amber-200';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border ${border} ${bg} flex items-start gap-3 transition-all duration-300 transform translate-y-0`}
          >
            {icon}
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
