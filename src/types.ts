export interface CompatibilityItem {
  icon: string;
  title: string;
  url: string;
}

export interface TechnologyItem {
  icon: string;
  title: string;
}

export interface FeatureItem {
  description: string;
  icon: string;
  title: string;
}

export interface FooterLink {
  description: string;
  icon: string;
  url: string;
  target?: string;
}

export interface NavItem {
  title?: string;
  url: string;
  target?: string;
  icon?: string;
}

export interface ShowcaseSite {
  title: string;
  image: ImageMetadata;
  description: string;
  techIcons: ReadonlyArray<string>;
  link?: string;
}
