'use client';
import { DataTableDemo } from '@/components/admin/companies/data-table';
import React, { useEffect } from 'react';

const CompanyManager = () => {
  // const [data,setData] = useState([])

  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-[16px]">
      <p className="font-bold">Company Manager</p>
      <DataTableDemo />
    </div>
  );
};

export default CompanyManager;
