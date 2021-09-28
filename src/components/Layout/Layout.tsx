import { Meta } from '@src/components';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
  <div>
    <div>
      <Meta />
      {children}
    </div>
  </div>
);
Layout.displayName = 'Layout';
