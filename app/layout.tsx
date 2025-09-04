import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const pokeFont = localFont({
	src: './fonts/pokefont.ttf',
	variable: '--font-poke',
});

export const metadata: Metadata = {
	title: 'Buy $POKECULT - Battle & Trade',
	description: 'By @caiooncrypto',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${pokeFont.variable} antialiased bg-[#fec716] min-h-screen flex flex-col`}
			>
				<div className='flex-grow'>{children}</div>
			</body>
		</html>
	);
}
