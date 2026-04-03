// src/constants/enums.ts

export enum EventType {
  SCROLL = 'scroll',
  RESIZE = 'resize',
  CLICK = 'click',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout'
}

export enum ScrollBehavior {
  SMOOTH = 'smooth',
  AUTO = 'auto',
  INSTANT = 'instant'
}

export enum SectionId {
  HOME = 'home',
  TEAM = 'team',
  PRODUCTS = 'products',
  RESOURCES = 'resources',
  RESEARCH = 'research'
}

export enum AnimationTiming {
  FAST = 200,
  NORMAL = 300,
  SLOW = 700
}

export enum AnimationProgressThreshold {
  HEADING = 0.15,
  FIRST_PARAGRAPH = 0.35,
  SECOND_PARAGRAPH = 0.55,
  THIRD_PARAGRAPH = 0.75
}

export interface VisibilityConfig {
  threshold: number;
  elementIndex: number;
  description: string;
}

export enum ProductStatus {
  AVAILABLE = 'available',
  UPCOMING = 'upcoming'
}