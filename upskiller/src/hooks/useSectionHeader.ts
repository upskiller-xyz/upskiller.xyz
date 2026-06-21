import { useState, useEffect } from 'react';
import { fetchJsonWithFallback } from '../utils/fetchWithFallback';
import AssetPathManager from '../utils/AssetPathManager';

export interface SectionHeaderCopy {
  title: string;
  subtitle?: string;
}

type SectionHeaders = Record<string, SectionHeaderCopy>;

// Single fetch shared across every section that uses the hook.
let headersPromise: Promise<SectionHeaders> | null = null;

const loadSectionHeaders = (): Promise<SectionHeaders> => {
  if (!headersPromise) {
    headersPromise = fetchJsonWithFallback(
      AssetPathManager.getDynamicData('sections.json'),
      '/dynamic/sections.json'
    ).catch((error) => {
      headersPromise = null; // allow a retry on the next mount
      throw error;
    });
  }
  return headersPromise;
};

/**
 * Returns the editable header copy (title/subtitle) for a section from
 * dynamic/sections.json. Returns null until loaded. Theme stays in code as a
 * ContentTheme — it's a presentation choice, not copy.
 */
export const useSectionHeader = (sectionId: string): SectionHeaderCopy | null => {
  const [header, setHeader] = useState<SectionHeaderCopy | null>(null);

  useEffect(() => {
    let active = true;
    loadSectionHeaders()
      .then((headers) => {
        if (active) setHeader(headers[sectionId] ?? null);
      })
      .catch((error) => {
        console.error('Error loading section headers:', error);
      });
    return () => {
      active = false;
    };
  }, [sectionId]);

  return header;
};
