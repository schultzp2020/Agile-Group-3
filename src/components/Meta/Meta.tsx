import Head from 'next/head';

/**
 * The Meta prop interface
 * @param title - The webpage title for browsers
 * @param keywords - The webpage keywords for browsers
 * @param description - The webpage description for browsers
 */
export interface MetaProps {
  title?: string;
  keywords?: string;
  description?: string;
}

/**
 * {@link Meta} implements a way to tell browsers what the webpage is
 * @param MetaProps - The required props for Meta
 * @returns React function component
 */
export const Meta: React.FC<MetaProps> = ({
  title,
  keywords,
  description
}: MetaProps): React.ReactElement => (
  <Head>
    <title>{title}</title>
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />

    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
    />
    <meta name="theme-color" content="#151515" />

    <link rel="icon" href="/images/icons/favicon.ico" />
  </Head>
);
Meta.displayName = 'Meta';

/**
 * The default props for all webpages under the server
 */
Meta.defaultProps = {
  title: 'Programming Assessment',
  keywords: 'Programming Assessment',
  description: 'Programming Assessment for CS-358'
};
