import { AppImage } from '@/common';
import { CustomImage } from '../client/Images/CustomImage';
import { Button } from '../ui/button';

export function InternalServerError() {
  return (
    <div className="mt-[20px] flex items-center justify-around">
      <div className="space-y-3">
        <p className="font-semibold text-4xl">500 - Internal Server Error</p>
        <span className="flex max-w-[400px] flex-wrap">
          Something went wrong. please connect with us:
        </span>
        <div className="flex gap-3">
          <Button className="rounded-xs bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200">
            HOME
          </Button>
          <Button className="rounded-xs bg-blue-100 text-blue-500 hover:bg-blue-200">
            GO BACK
          </Button>
        </div>
      </div>
      <div>
        <CustomImage
          src={AppImage.ErrorImgs.internalServerErrorImg.src}
          className="bg-transparent shadow-none size-[600px]"
          alt="not-found-img"
        />
      </div>
    </div>
  );
}
