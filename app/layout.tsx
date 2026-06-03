import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Leaf & Lantern Books",
  description: "A modern online bookstore for thoughtful readers."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* RudderStack browser SDK stub — must load before any client component
            calls initRudder(). The stub queues calls until the full SDK
            (loaded async from CDN) is ready. Write key + data plane URL are
            read from NEXT_PUBLIC_RUDDER_WRITE_KEY / NEXT_PUBLIC_RUDDER_DATA_PLANE_URL
            by analytics/client.ts at runtime. */}
        <Script id="rudder-snippet" strategy="beforeInteractive">{`
          !function(){
            var e="rudderanalytics";
            if(!window[e]){
              var t=window[e]=[];
              t.methods=["load","page","track","identify","alias","group","ready","reset","getAnonymousId","setAnonymousId"];
              t.factory=function(n){return function(){var r=Array.prototype.slice.call(arguments);r.unshift(n);t.push(r);return t}};
              for(var n=0;n<t.methods.length;n++){var r=t.methods[n];t[r]=t.factory(r)}
              t.loadJS=function(){
                var e=document.createElement("script");
                e.type="text/javascript";
                e.async=true;
                e.src="https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js";
                var t=document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e,t)
              };
              t.loadJS()
            }
          }();
        `}</Script>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
