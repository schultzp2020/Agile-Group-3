import { Meta, Header } from '@src/components';

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
    <Header />
    {children}
  </div>
);
Layout.displayName = 'Layout';
