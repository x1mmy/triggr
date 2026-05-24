import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '@/lib/og/fonts';

export const runtime = 'edge';
export const alt = 'Triggr — AI automation and custom web development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function LogoSlashes({ size = 28, color = '#F0F0EE' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <line x1="22" y1="2" x2="8" y2="34" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <line x1="30" y1="2" x2="16" y2="34" stroke={color} strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}

export default async function OgImage() {
  const [syneBold, figtree] = await Promise.all([
    loadGoogleFont('Syne', 700),
    loadGoogleFont('Figtree', 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#090909',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient mesh */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240,240,238,0.09) 0%, transparent 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(136,136,132,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Double-bezel frame */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            margin: 40,
            padding: 6,
            borderRadius: 36,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              borderRadius: 30,
              background: 'linear-gradient(145deg, #111110 0%, #0a0a0a 55%, #070707 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
              padding: '52px 56px',
              position: 'relative',
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 48,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <LogoSlashes size={32} />
                <span
                  style={{
                    fontFamily: 'Syne',
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#F0F0EE',
                  }}
                >
                  TRIGGR
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Figtree',
                    fontSize: 13,
                    color: '#888884',
                    letterSpacing: '0.04em',
                  }}
                >
                  usetriggr.com.au
                </span>
              </div>
            </div>

            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'Figtree',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#888884',
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                Automation · Web Development · AI
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Syne',
                  fontSize: 72,
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: '#F0F0EE',
                  maxWidth: 900,
                }}
              >
                Built for you.
              </div>
              <div
                style={{
                  fontFamily: 'Syne',
                  fontSize: 72,
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: 'rgba(240,240,238,0.42)',
                  maxWidth: 900,
                  marginTop: 4,
                }}
              >
                Runs without you
              </div>
              <div
                style={{
                  fontFamily: 'Figtree',
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: '#888884',
                  maxWidth: 780,
                  marginTop: 28,
                }}
              >
                Done-for-you AI automation and custom web software — lead capture, workflows, and sites that convert.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Syne', data: syneBold, weight: 700, style: 'normal' },
        { name: 'Figtree', data: figtree, weight: 500, style: 'normal' },
      ],
    },
  );
}
