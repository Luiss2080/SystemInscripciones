import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, #0e7490 0%, #030712 90%)",
          borderRadius: 8,
          border: "1.5px solid #22d3ee",
          color: "#22d3ee",
          fontSize: 16,
          fontWeight: 900,
          fontFamily: "monospace",
          letterSpacing: "-1px",
        }}
      >
        &gt;_
      </div>
    ),
    {
      ...size,
    }
  );
}
