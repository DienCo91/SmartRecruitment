import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Router } from '@/constants';
import { useLogout } from '@/hooks/useLogout';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { BookIcon, LogOutIcon, SquareUserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AvatarUser } from './AvatarUser';

export function ShortUserInfo() {
  const router = useRouter();
  const logout = useLogout();
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  const options = [
    {
      icon: <SquareUserIcon color="#c1c3c9" size={18} />,
      label: 'Hồ sơ cá nhân',
      route: Router.DASHBOARD.OVERVIEW,
    },
    {
      icon: <BookIcon color="#c1c3c9" size={18} />,
      label: 'Bài viết của tôi',
      route: Router.MY_BLOG,
    },
    // {
    //   icon: <BookMarkedIcon color="#c1c3c9" size={18} />,
    //   label: 'Đã lưu',
    //   route: Router.USER.SAVED_JOB,
    // },
    // {
    //   icon: <FileUserIcon color="#c1c3c9" size={18} />,
    //   label: 'Đã ứng tuyển',
    //   route: Router.USER.APPLIED_JOB,
    // },
  ];

  return (
    <div className="flex gap-2 items-center inset-shadow-sm rounded-full pl-3 shadow-xl ring-1 ring-blue-500/50">
      <div className="flex flex-col font-normal text-right text-xs">
        <span>{currentUser?.userName}</span>
        <span>{currentUser?.email}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarUser src={currentUser?.avatar} className="size-8 hover:cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="p-0 w-[160px] border-none bg-[#384878] shadow-md shadow-blue-500/50"
        >
          {options.map((o, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => router.push(o.route)}
              className="cursor-pointer text-neutral-300 data-[highlighted]:bg-white/30 data-[highlighted]:text-white rounded-none"
            >
              {o.icon}
              {o.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-neutral-300 data-[highlighted]:bg-white/30 data-[highlighted]:text-white rounded-none "
          >
            <LogOutIcon color="#c1c3c9" size={18} />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
