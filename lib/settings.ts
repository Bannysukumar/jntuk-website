export interface SiteSettings {
  siteName?: string;
  siteUrl?: string;
  adsEnabled?: boolean;
  adsPublisherId?: string;
  adsSlotId?: string;
}

const DEFAULT_ADS = {
  enabled: true,
  publisherId: "ca-pub-1589551808134823",
  slotId: "8618507332",
};

export async function getSettings(): Promise<SiteSettings | null> {
  return {
    siteName: "JNTUK RESULTS",
    adsEnabled: DEFAULT_ADS.enabled,
    adsPublisherId: DEFAULT_ADS.publisherId,
    adsSlotId: DEFAULT_ADS.slotId,
  };
}

export async function getAdsEnabled(): Promise<boolean> {
  return DEFAULT_ADS.enabled;
}

export async function getAdsConfig(): Promise<{
  enabled: boolean;
  publisherId: string;
  slotId: string;
}> {
  return DEFAULT_ADS;
}
