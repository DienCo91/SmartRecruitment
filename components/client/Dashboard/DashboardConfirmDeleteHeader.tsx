'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DashboardConfirmDeleteHeader = () => {
  return (
    <div className={`flex items-start gap-3`}>
      <div className="text-red-500">
        <AlertTriangle size={24} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">Are you sure?</h2>
        <p className="text-sm text-gray-400">This action cannot be undone.</p>
      </div>
    </div>
  );
};

export default DashboardConfirmDeleteHeader;
