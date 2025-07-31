import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20px',
        }}
      >
        {/* Medical cross icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Vertical bar of cross */}
          <div
            style={{
              width: '16px',
              height: '64px',
              backgroundColor: 'white',
              position: 'absolute',
              borderRadius: '8px',
            }}
          />
          {/* Horizontal bar of cross */}
          <div
            style={{
              width: '64px',
              height: '16px',
              backgroundColor: 'white',
              position: 'absolute',
              borderRadius: '8px',
            }}
          />
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}