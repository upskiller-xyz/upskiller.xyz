/** Background theme for a page section (drives the `section-*` class). */
export enum SectionTheme {
  Primary = 'primary',
  Secondary = 'secondary',
  Support = 'support',
}

/** Text/content theme for titles and subtitles. */
export enum ContentTheme {
  Light = 'light',
  Dark = 'dark',
  Contact = 'contact',
}

export interface DisplayConfig {
  title?: string;
  descriptionLabel?: string;
  itemsLabel?: string;
  icon?: React.ReactNode;
}

export interface InfoCardDisplay {
  content: any; // Will be ProductContent
  display: DisplayConfig;
  button?: any; // Will be ButtonBase
  config?: any; // Will be InfoCardConfig
}