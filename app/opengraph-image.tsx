import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Zend: cash that works anywhere.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [semibold, light, mark] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "app/fonts/Geist-Light.ttf")),
    readFile(join(process.cwd(), "public/zend-mark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#F2F1ED",
          color: "#0F0F0E",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={56} height={56} style={{ borderRadius: 14 }} alt="" />
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>Zend</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: -5 }}>
          <span style={{ fontWeight: 600 }}>Cash that works</span>
          <span style={{ fontWeight: 300 }}>anywhere.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5C5B57" }}>
          A chat, a link, an inbox, Tokyo, the Moon.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: light, weight: 300, style: "normal" },
      ],
    },
  );
}
