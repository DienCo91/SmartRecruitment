'use client';

import { AvatarUser } from '@/components/client/Avatar/AvatarUser';
import { CustomImage } from '@/components/client/Images/CustomImage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminService } from '@/services/admin.services';
import { CompanyDetail } from '@/types';
import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

export function ModalDetailEmployer({
  id,
  setIsOpen,
}: {
  id?: string;
  setIsOpen: (isOpen?: string) => void;
}) {
  const [data, setData] = useState<CompanyDetail>();
  const [loading, setLoading] = useState(true);

  const getEmployerDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await AdminService.getCompanyDetail(+id);
      setData(res.data);
    } catch (e) {
      console.error('Error fetching employer detail:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployerDetail();
  }, [id]);

  return (
    <Dialog open={!!id}>
      <DialogContent className="max-w-2xl p-0 overflow-auto" showCloseButton={false}>
        <DialogHeader className="p-4 flex flex-row justify-between items-center border-b">
          <DialogTitle>Thông tin công ty</DialogTitle>
          <IoCloseCircle size={26} className="cursor-pointer" onClick={() => setIsOpen()} />
        </DialogHeader>

        {loading && <p className="p-4">Đang tải...</p>}

        {!loading && data && (
          <div className="space-y-5 p-4 ">
            {/* BANNER */}
            {data.bannerUrl && (
              <CustomImage
                src={data.bannerUrl}
                alt="thumbnail"
                className="h-[180px] w-full relative z-0 rounded-none"
                classNameImage="object-cover"
              />
            )}

            {/* LOGO + NAME */}
            <div className="flex flex-col items-center relative z-[10] mt-[-60px]">
              {data.logoUrl && (
                <AvatarUser
                  classNameImage="object-cover"
                  className="border-none w-[100px] h-[100px]"
                  src={data.logoUrl}
                />
              )}
              <h2 className="text-xl font-bold mt-2">{data.name}</h2>
              <p className="text-gray-500">{data.industryType}</p>
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>

              <p>
                <strong>Organization:</strong> {data.organizationType}
              </p>
              <p>
                <strong>Industry:</strong> {data.industryType}
              </p>

              <p>
                <strong>Team size:</strong> {data.teamSize}
              </p>
              <p>
                <strong>Founded in:</strong> {data.foundedIn}
              </p>

              <p className="col-span-2">
                <strong>Website: </strong>
                <a href={data.website} className="text-blue-600 underline" target="_blank">
                  {data.website}
                </a>
              </p>
            </div>

            {/* DESCRIPTION */}
            {data.description && (
              <div>
                <strong>Description:</strong>
                <div
                  className="p-2 border rounded mt-1 text-sm"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            )}

            {/* COMPANY VISION */}
            {data.companyVision && (
              <div>
                <strong>Company Vision:</strong>
                <div
                  className="p-2 border rounded mt-1 text-sm"
                  dangerouslySetInnerHTML={{ __html: data.companyVision }}
                />
              </div>
            )}

            {/* LOCATION */}
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

            {/* SOCIAL LINKS */}
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
