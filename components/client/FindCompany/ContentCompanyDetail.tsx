import { Separator } from '@/components/ui/separator';
import React from 'react';
import { DecorateContent } from '../Jobs/DecorateContent';
import { CompanyDetail } from '@/types';

interface IContentCompanyDetail {
  company: CompanyDetail;
}
const ContentCompanyDetail: React.FC<IContentCompanyDetail> = ({ company }) => {
  return (
    <>
      <Separator className="bg-white w-full h-[1px]" />
      <DecorateContent className="text-justify" title="Mô tả" content={company.description} />
      {/* <DecorateContent
        className="text-justify"
        title="Phúc lợi"
        content={
          'Donec dignissim nunc eu tellus malesuada fermentum. Sed blandit in magna at accumsan. Etiam imperdiet massa aliquam, consectetur leo in, auctor neque.\n'
        }
      />
      <DecorateContent
        className="text-justify"
        title="Tầm Nhìn"
        content={
          'Praesent ultrices mauris at nisi euismod, ut venenatis augue blandit. Etiam massa risus, accumsan nec tempus nec, venenatis in nisl. Maecenas nulla ex, blandit in magna id, pellentesque facilisis sapien. In feugiat auctor mi, eget commodo lectus convallis ac. '
        }
      /> */}
    </>
  );
};

export default ContentCompanyDetail;
