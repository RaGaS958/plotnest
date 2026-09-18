import React from 'react';
import { PlotStatus, ProjectStatus, VerificationStatus, PaymentStatus, BookingStatus } from '../../types';

interface BadgeProps {
  status: PlotStatus | ProjectStatus | VerificationStatus | PaymentStatus | BookingStatus | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const normalized = status.toUpperCase();

  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = status;

  switch (normalized) {
    case 'AVAILABLE':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dotColor = 'bg-emerald-500';
      label = 'Available';
      break;
    case 'ON_HOLD':
      bg = 'bg-amber-50 text-amber-800 border-amber-200';
      dotColor = 'bg-amber-500 animate-pulse';
      label = 'On Hold';
      break;
    case 'PAYMENT_PENDING':
      bg = 'bg-orange-50 text-orange-800 border-orange-200';
      dotColor = 'bg-orange-500';
      label = 'Payment Pending';
      break;
    case 'BOOKED':
    case 'SOLD':
      bg = 'bg-rose-50 text-rose-800 border-rose-200';
      dotColor = 'bg-rose-500';
      label = 'Booked';
      break;
    case 'BLOCKED':
      bg = 'bg-gray-100 text-gray-700 border-gray-300';
      dotColor = 'bg-gray-500';
      label = 'Blocked';
      break;
    case 'PUBLISHED':
    case 'APPROVED':
    case 'VERIFIED':
    case 'CONFIRMED':
    case 'PAID':
    case 'SUCCESS':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dotColor = 'bg-emerald-500';
      label = normalized.replace('_', ' ');
      break;
    case 'SUBMITTED':
    case 'UNDER_REVIEW':
    case 'PENDING':
    case 'REQUESTED':
      bg = 'bg-blue-50 text-blue-800 border-blue-200';
      dotColor = 'bg-blue-500';
      label = normalized.replace('_', ' ');
      break;
    case 'CHANGES_REQUIRED':
      bg = 'bg-amber-50 text-amber-800 border-amber-200';
      dotColor = 'bg-amber-500';
      label = 'Changes Req.';
      break;
    case 'REJECTED':
    case 'CANCELLED':
    case 'FAILED':
      bg = 'bg-rose-50 text-rose-800 border-rose-200';
      dotColor = 'bg-rose-500';
      label = normalized;
      break;
    default:
      break;
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2.5 py-0.5' 
    : size === 'md' 
    ? 'text-xs px-3 py-1' 
    : 'text-sm px-3.5 py-1.5 font-medium';

  return (
    <span
      id={`badge-${normalized.toLowerCase()}`}
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses} ${bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
};

export const VerificationBadge: React.FC<{ type?: string; label?: string }> = ({
  label = 'Verified Project'
}) => {
  return (
    <span
      id="verification-badge"
      className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200"
    >
      <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span>{label}</span>
    </span>
  );
};
