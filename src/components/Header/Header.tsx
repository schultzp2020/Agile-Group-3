import Link from 'next/link';
import StoutTitle from '@public/images/placeholder.png';
import StoutLogo from '@public/images/placeholder.png';

export interface Page {
  name: string;
  href: string;
}

const pages: Page[] = [
  { name: 'Home Page', href: '/' },
  { name: 'Scheduler', href: '/scheduler' },
  { name: 'SI', href: '/si' },
  { name: 'Professor', href: '/professor' }
];

export const Header: React.FC = () => (
  <div className="bg-blue-800 p-8 border-2 border-black">
    <div className="bg-blue-900 p-4">
      <div className="flex items-center justify-center brightness-200 bg-blend-lighten">
        <img src={StoutTitle.src} alt="Stout logo" width="200"></img>
        <img src={StoutLogo.src} alt="Stout logo" width="200"></img>
      </div>
      <ul className="m-4 flex justify-evenly">
        {pages.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>
              <a className="bg-blue-700 hover:bg-blue-300 flex items-center text-white p-4 border-2 border-black rounded-lg">
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Header.displayName = 'Header';
