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
