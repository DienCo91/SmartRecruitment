'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardConfirmDeleteFooterProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

const DashboardConfirmDeleteFooter: React.FC<DashboardConfirmDeleteFooterProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        Delete
      </Button>
    </div>
  );
};

export default DashboardConfirmDeleteFooter;
