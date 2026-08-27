import { ImageResponse } from "next/og";
export const alt = "GharJagga Kathmandu — Find your place in the capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 76, color: "#f8f3e7", background: "linear-gradient(135deg, #102e25 0%, #1d513f 62%, #c46f3d 180%)", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}><span style={{ width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: "#e89356", color: "#173b30" }}>घ</span>GharJagga Kathmandu</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div style={{ fontSize: 72, lineHeight: 1.06, letterSpacing: -3, maxWidth: 900 }}>Find your place in Kathmandu.</div><div style={{ fontSize: 28, color: "#d9e3dc" }}>Verified houses and land across the capital.</div></div>
      <div style={{ display: "flex", gap: 24, fontSize: 23, color: "#f0c6a4" }}>Houses · Land · Local measurements · Human guidance</div>
    </div>, size,
  );
}
