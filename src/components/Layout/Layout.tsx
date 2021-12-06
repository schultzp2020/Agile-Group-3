import { Meta } from '@src/components';
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

/**
 * The Layout prop interface
 * @param children - The React children to pass down
 */
export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * {@link Layout} implements a way to have a consistent background to each webpage
 * @param LayoutProps - The required props for Layout
 * @returns React function component
 */
export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
  <div>
    <Meta />
    <ul className="m-4 flex justify-evenly">
      {pages.map(({ name, href }) => (
        <li key={name}>
          <Link href={href}>
            <a className="p-2 border-2 border-black">{name}</a>
          </Link>
        </li>
      ))}
    </ul>
    {children}
  </div>
);
Layout.displayName = 'Layout';
