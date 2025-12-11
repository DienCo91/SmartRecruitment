'use client';

import { AvatarUser } from '@/components/client/Avatar/AvatarUser';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminService } from '@/services/admin.services';
import { ICandidateDetail } from '@/types';

import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

export function ModalDetailCandidate({
  id,
  setIsOpen,
}: {
  id?: string;
  setIsOpen: (isOpen?: string) => void;
}) {
  const [data, setData] = useState<ICandidateDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const getCandidateDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await AdminService.getCandidateDetail(+id);
      setData(res.data);
    } catch (e) {
      console.error('Error fetching candidate detail:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidateDetail();
  }, [id]);

  return (
    <Dialog open={!!id}>
      <DialogContent className="max-w-xl" showCloseButton={false}>
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle>Thông tin ứng viên</DialogTitle>
          <IoCloseCircle size={24} onClick={() => setIsOpen()} />
        </DialogHeader>

        {loading && <p>Đang tải...</p>}
        {!loading && data && (
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              {data?.avatarUrl && (
                <AvatarUser
                  src={data.avatarUrl}
                  classNameImage="object-cover"
                  className="border-none w-[100px] h-[100px]"
                />
              )}
              <h2 className="text-lg font-bold mt-2">{data.fullName}</h2>
              <p className="text-gray-500">{data.headline}</p>
            </div>

            {/* Basic info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <p>
                <strong>Gender:</strong> {data.gender}
              </p>
              <p>
                <strong>Birth:</strong> {data.dateOfBirth}
              </p>
              <p>
                <strong>Experience:</strong> {data.experienceLevel}
              </p>
              <p>
                <strong>Education:</strong> {data.educationLevel}
              </p>
              <p>
                <strong>Nationality:</strong> {data.nationality}
              </p>
            </div>

            {/* Biography */}
            {data.biography && (
              <div>
                <strong>Biography:</strong>
                <div
                  className="p-2 border rounded mt-1 text-sm"
                  dangerouslySetInnerHTML={{ __html: data.biography }}
                />
              </div>
            )}

            {/* Location */}
            {data.location && (
              <div className="text-sm space-y-1">
                <strong>Location:</strong>
                <p>- Country: {data.location.country}</p>
                <p>- City: {data.location.provinceCity}</p>
                <p>- Commune: {data.location.commune}</p>
                <p>- Lat: {data.location.latitude}</p>
                <p>- Lng: {data.location.longitude}</p>
              </div>
            )}

            {/* Social links */}
            {data.socialLinks?.length > 0 && (
              <div>
                <strong>Social Links:</strong>
                <ul className="list-disc pl-4 text-sm">
                  {data.socialLinks.map((item, idx) => (
                    <li key={idx}>
                      {item.platformName}:{' '}
                      <a href={item.url} target="_blank" className="text-blue-600 underline">
                        {item.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
