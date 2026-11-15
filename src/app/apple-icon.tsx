import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #083344 50%, #030712 100%)",
          borderRadius: 44,
          border: "5px solid #06b6d4",
          boxShadow: "0 20px 40px rgba(6,182,212,0.3)",
          color: "#22d3ee",
          fontSize: 84,
          fontWeight: 900,
          fontFamily: "monospace",
        }}
      >
        <span style={{ marginTop: -8 }}>&gt;_</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
