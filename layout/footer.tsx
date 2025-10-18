'use client';

import GlassCardBase from '@/components/client/Cards/GlassCardBase';
import LogoApp from '@/components/ui/logo-app';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <GlassCardBase className="mt-[40px] rounded-none hover:translate-y-[0px]">
      <footer>
        {/* Main section */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8 px-6 py-12">
          {/* Logo + Info */}
          <div>
            <LogoApp className="mb-4" />
            <p className="text-md text-white mb-4">
              Số 96A Trần Phú, phường Hà Đông, thành phố Hà Nội
            </p>
          </div>

          {/* Candidate */}
          <div>
            <h4 className="text-white font-semibold mb-4">Candidate</h4>
            <ul className="space-y-2">
              <li>
                <p className="hover:text-white transition">Browse Jobs</p>
              </li>
              <li>
                <p className="hover:text-white transition">Browse Employers</p>
              </li>
              <li>
                <p className="hover:text-white transition">Candidate Dashboard</p>
              </li>
              <li>
                <p className="hover:text-white transition">Saved Jobs</p>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">Employers</h4>
            <ul className="space-y-2">
              <li>
                <p className="hover:text-white transition">Post a Job</p>
              </li>
              <li>
                <p className="hover:text-white transition">Browse Candidates</p>
              </li>
              <li>
                <p className="hover:text-white transition">Employers Dashboard</p>
              </li>
              <li>
                <p className="hover:text-white transition">Applications</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t  border-gray-700 py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 justify-center">
          © 2025 MyJob - Job Portal. All rights Reserved.
        </div>
      </footer>
    </GlassCardBase>
  );
}
