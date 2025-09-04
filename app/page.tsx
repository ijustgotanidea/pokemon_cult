import Image from 'next/image';
import AudioPlayer from './components/ui/audio-player';
import { InfiniteTextCarousel } from './components/ui/infinite-text-carousel';
import { Pill } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

export default function Home() {
	return (
		<div className='font-sans flex flex-col items-center justify-items-center min-h-screen gap-16'>
			<header className='text-center p-8'>
				<Image src='/pokecult-logo.png' alt='$POKECULT' width={800} height={800} />
			</header>
			<main className='w-full flex-1'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-36'>
					<section className='flex flex-col gap-1 max-w-96'>
						<h2 className='text-6xl font-bold text-white w-full flex mb-4'>
							$Pokecult is a token to represent the community love for pokemon.
						</h2>
						<h4>
							Fees will be repurchased on the chart, in addition to a boost payment in the dex.
						</h4>
					</section>

					<div></div>

					<section className='p-6 flex flex-col gap-4 justify-center items-center'>
						<div className='flex flex-row gap-4 justify-center items-center'>
							<a
								className='text-xl font-bold text-white mb-4 rounded-full p-2 bg-white border border-black border-r-3 border-b-3'
								href='https://x.com/i/communities/1958130076949619185'
								target='_blank'
							>
								<FaXTwitter className='text-black h-9 w-9' height={36} width={36} />
							</a>
							<a
								className='text-xl font-bold text-white mb-4 rounded-full p-2 bg-white border border-black border-r-3 border-b-3'
								href=''
							>
								<Pill className='text-black h-9 w-9' height={36} width={36} />
							</a>
						</div>
						<button className='bg-[#264b7c] text-white border-4 border-black p-4 w-max font-bold text-2xl'>Battle now!</button>
					</section>
				</div>
			</main>
			<AudioPlayer audioSrc='/audio/poke-theme.mp3' />
			<footer className='w-full border-t py-3 bg-slate-900 text-white'>
				<InfiniteTextCarousel
					text='BUY $POKECULT'
					className='text-sm font-medium'
					speed={40}
					gap={80}
				/>
			</footer>
		</div>
	);
}
