const GA_TRACKING_ID = "G-K71X77D87X";

/**
 * The Google tag is inlined once in app/layout.tsx <head>.
 * Do not render this component — a second tag would duplicate hits.
 */
export default function GoogleAnalytics() {
  return null;
}

export { GA_TRACKING_ID };
