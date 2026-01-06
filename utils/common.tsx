import { locations } from '@/constants/mockedData';
import { Bell, Bookmark, UserIcon } from 'lucide-react';
import {
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaLinkedin,
  FaReddit,
  FaSkype,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TiSocialFacebook, TiSocialInstagram } from 'react-icons/ti';

export const getIconSocialLink = (platform: string) => {
  const upper = platform.toUpperCase();

  switch (upper) {
    case 'FACEBOOK':
      return <TiSocialFacebook className="text-blue-600" />;
    case 'INSTAGRAM':
      return <TiSocialInstagram className="text-pink-500" />;
    case 'X':
      return <FaXTwitter />;
    case 'LINKEDIN':
      return <FaLinkedin className="text-blue-600" />;
    case 'YOUTUBE':
      return <FaYoutube className="text-red-500" />;
    case 'REDDIT':
      return <FaReddit className="text-orange-500" />;
    case 'SKYPE':
      return <FaSkype className="text-blue-500" />;
    case 'GITLAB':
      return <FaGitlab className="text-orange-600" />;
    case 'GITHUB':
      return <FaGithub className="text-gray-800 dark:text-gray-100" />;
    case 'PORTFOLIO':
      return <FaGlobe className="text-green-600" />;
    default:
      return null;
  }
};

export const getLabelLocationByValue = (value: string) => {
  if (value === 'all') return;
  return locations.find(item => item.value === value)?.label;
};

export const formatNumber = (num: number | string) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const parseSalaryRange = (salaryString: string) => {
  if (salaryString === 'all') return { minSalary: 0, maxSalary: null };

  const numbers = salaryString.replace(/\$/g, '').split(/[-+]/).map(Number);

  const minSalary = numbers[0] || 0;
  const maxSalary = salaryString.includes('+') ? null : numbers[1] || null;

  return { minSalary, maxSalary };
};

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date
    .toLocaleString('en-US', {
      month: 'short', // "Feb"
      day: 'numeric', // 2
      year: 'numeric', // 2019
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24h format, remove if you want AM/PM
    })
    .replace(',', '');
}

export const handleSendMail = (email?: string) => {
  const to = email || '';

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;

  window.open(gmailUrl, '_blank');
};

export const downloadFile = async (url: string) => {
  const filename = url.split('/').filter(Boolean).pop()?.split('?')[0] || 'download-file';

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const isDateExpired = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  return date.getTime() < now.getTime();
};

export async function urlToFile(url: string, filename: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new File([blob], filename, {
    type: blob.type,
  });
}

export const getStatEmployer = ({
  totalJob,
  totalFollow,
}: {
  totalJob: number;
  totalFollow: number;
}) => {
  return [
    {
      title: 'Job đang mở',
      value: totalJob,
      icon: <Bell className="text-blue-600" />,
      color: '#E7F0FA',
    },
    {
      title: 'Ứng viên Follow',
      value: totalFollow,
      icon: <UserIcon className="text-orange-500" />,
      color: '#FFF6E6',
    },
  ];
};

export const getStatCandidate = ({
  totalApplied,
  totalFavJob,
}: {
  totalApplied: number;
  totalFavJob: number;
}) => {
  return [
    {
      title: 'Công Việc đã Nộp',
      value: totalApplied,
      icon: <Bell className="text-blue-600" />,
      color: '#E7F0FA',
    },
    {
      title: 'Công việc yêu thích',
      value: totalFavJob,
      icon: <Bookmark className="text-orange-500" />,
      color: '#FFF6E6',
    },
  ];
};
