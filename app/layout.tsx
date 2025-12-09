import type { Metadata } from 'next';
import './globals.css';
import { OSProvider } from './context/OSContext';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Aanand Pandit - Portfolio OS',
    description: 'Interactive Windows-style portfolio',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-2SQZENES0W"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-2SQZENES0W');
                    `}
                </Script>
            </head>
            <body>
                <OSProvider>{children}</OSProvider>
            </body>
        </html>
    );
}
