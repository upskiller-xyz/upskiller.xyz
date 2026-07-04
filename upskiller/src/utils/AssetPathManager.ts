/**
 * Centralized asset path management for Upskiller website
 */
export class AssetPathManager {
  private static readonly BUCKET_BASE_URL = (
    import.meta.env.VITE_ASSET_BASE_URL || 'https://upskiller-website.s3.fr-par.scw.cloud/upskiller'
  ).replace(/\/+$/, '');
  
  // Static asset categories
  static readonly CATEGORIES = {
    IMAGES: 'images',
    LOGOS: 'logo',
    ICONS: 'icons',
    ACTIONS: 'images/action',
    MASKS: 'images/masks',
    DYNAMIC: 'dynamic',
    PARTNERS: 'partners',
    LEGAL: 'legal'
  } as const;

  /**
   * Get the full URL for an asset
   */
  static getAssetUrl(category: string, filename: string): string {
    return `${this.BUCKET_BASE_URL}/${category}/${filename}`;
  }

  /**
   * Get team member action image URL
   */
  static getActionImage(memberId: string): string {
    return this.getAssetUrl(this.CATEGORIES.ACTIONS, `action_${memberId}.png`);
  }

  /**
   * Get team member mask SVG URL (cloud hosted)
   */
  static getMaskSvg(memberId: string): string {
    return this.getAssetUrl(this.CATEGORIES.MASKS, `mask_${memberId}.svg`);
  }

  /**
   * Get main team image URL
   */
  static getTeamImage(): string {
    return this.getAssetUrl(this.CATEGORIES.IMAGES, 'upskiller_cropped.png');
  }

  /**
   * Get logo URL
   */
  static getLogo(): string {
    return this.getAssetUrl(this.CATEGORIES.LOGOS, 'logo.svg');
  }

  /**
   * Get navigation logo URL (RGB version)
   */
  static getNavigationLogo(): string {
    return this.getAssetUrl(this.CATEGORIES.LOGOS, 'upskiller_logo_RGB.svg');
  }

  /**
   * Get product icon URL
   */
  static getProductIcon(): string {
    return this.getAssetUrl(this.CATEGORIES.ICONS, 'product.svg');
  }

  /**
   * Get hero motif URL
   */
  static getHeroMotif(): string {
    return this.getAssetUrl(this.CATEGORIES.LOGOS, 'motif-1.svg');
  }

  /**
   * Get dynamic JSON file URL
   */
  static getDynamicData(filename: string): string {
    return this.getAssetUrl(this.CATEGORIES.DYNAMIC, filename);
  }

  /**
   * Get partner logo URL
   */
  static getPartnerLogo(filename: string): string {
    return this.getAssetUrl(this.CATEGORIES.PARTNERS, filename);
  }

  /**
   * Get legal document URL
   */
  static getLegalDocument(filename: string): string {
    return this.getAssetUrl(this.CATEGORIES.LEGAL, filename);
  }

  /**
   * Get social icon URL (stored in logos category)
   */
  static getSocialIcon(filename: string): string {
    return this.getAssetUrl(this.CATEGORIES.LOGOS, filename);
  }

  /**
   * Get base bucket URL (for cases where full control is needed)
   */
  static getBucketBaseUrl(): string {
    return this.BUCKET_BASE_URL;
  }
}

export default AssetPathManager;