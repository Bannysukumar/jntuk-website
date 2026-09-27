"use client";

import { useEffect, useState } from "react";
import { getSiteHost } from "@/lib/seo";

const SiteHost = () => {
  const [host, setHost] = useState(getSiteHost);
  useEffect(() => {
    if (window.location.host) setHost(window.location.host);
  }, []);
  return <>{host}</>;
};

export default SiteHost;
