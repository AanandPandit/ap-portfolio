import type { Metadata } from 'next';
import './globals.css';
import { OSProvider } from './context/OSContext';

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
            <body>
                <OSProvider>{children}</OSProvider>
            </body>
        </html>
    );
}
