import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';

const customRender = (ui: React.ReactElement, options: RenderOptions = {}): RenderResult =>
  render(ui, { ...options });

export * from '@testing-library/react';

export { customRender as render };
