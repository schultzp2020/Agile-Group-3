import Link from 'next/link';

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
  <ul className="m-4 flex justify-evenly">
    {pages.map(({ name, href }) => (
      <li key={name}>
        <Link href={href}>
          <a className="p-2 border-2 border-black">{name}</a>
        </Link>
      </li>
    ))}
  </ul>
);
Header.displayName = 'Header';
