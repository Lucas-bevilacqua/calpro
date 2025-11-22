import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'Calculadoras Profissionais Especializadas';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        backgroundImage: 'linear-gradient(to bottom right, #fff 0%, #f0f9ff 100%)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        {/* Icon placeholder */}
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <line x1="8" y1="6" x2="16" y2="6" />
                            <line x1="16" y1="14" x2="16" y2="14" />
                            <line x1="16" y1="18" x2="16" y2="18" />
                            <line x1="8" y1="10" x2="16" y2="10" />
                            <line x1="8" y1="14" x2="12" y2="14" />
                            <line x1="8" y1="18" x2="12" y2="18" />
                        </svg>
                    </div>
                    <div
                        style={{
                            fontSize: 60,
                            fontStyle: 'normal',
                            letterSpacing: '-0.025em',
                            color: '#0f172a',
                            marginTop: 30,
                            padding: '0 120px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                            textAlign: 'center',
                            fontWeight: 700,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: '#64748b',
                            marginTop: 20,
                            fontWeight: 500,
                        }}
                    >
                        CalcPro.br
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
