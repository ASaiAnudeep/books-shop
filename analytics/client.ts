"use client";

declare global {
  interface Window {
    rudderanalytics?: {
      load: (writeKey: string, dataPlaneUrl: string) => void;
      page: (name: string, properties: Record<string, unknown>) => void;
      track: (name: string, properties: Record<string, unknown>) => void;
      identify: (id: string, traits: Record<string, unknown>) => void;
    };
  }
}

let initialized = false;

export const initRudder = () => {
  if (initialized || typeof window === "undefined") {
    return;
  }

  const writeKey = process.env.NEXT_PUBLIC_RUDDER_WRITE_KEY;
  const dataPlaneUrl = process.env.NEXT_PUBLIC_RUDDER_DATA_PLANE_URL;

  if (!writeKey || !dataPlaneUrl || !window.rudderanalytics) {
    return;
  }

  window.rudderanalytics.load(writeKey, dataPlaneUrl);
  initialized = true;
};

export const getRudder = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.rudderanalytics;
};
