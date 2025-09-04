'use client';

import Image from 'next/image';
import AudioPlayer from './components/ui/audio-player';
import { InfiniteTextCarousel } from './components/ui/infinite-text-carousel';
import { Pill } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import EmblaCarousel from './components/ui/embla-carousel';
import { motion } from 'framer-motion';

export default function Home() {
	const Slides = [
		{
			id: 1,
			src: '/poke-cook.png',
			description: 'Me when I cook a BANGER',
		},
		{
			id: 2,
			src: '/poke-love.jpeg',
			description: 'Love is in the air, just like $POKECULT',
		},
		{
			id: 3,
			src: '/poke-fnf.png',
			description: 'Me and my FNF in the call trenching together',
		},
		{
			id: 4,
			src: '/poke-hug.png',
			description: 'We would love to hug you all',
		},
		{
			id: 5,
			src: '/poke-late.jpg',
			description: 'Basically the dev, always late',
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	const slideUpVariants = {
		hidden: {
			opacity: 0,
			y: 50,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
			},
		},
	};

	return (
		<motion.div
			className='font-sans flex flex-col items-center justify-items-center min-h-screen gap-16'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			<motion.header className='text-center p-8' variants={itemVariants}>
				<Image src='/pokecult-logo.png' alt='$POKECULT' width={800} height={800} />
				<p className='font-bold text-white'>CA: Coming soon!</p>
			</motion.header>
			<motion.main className='w-full flex-1' variants={itemVariants}>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-36'>
					<motion.section className='flex flex-col gap-1 max-w-96' variants={itemVariants}>
						<h2 className='text-6xl font-bold text-white w-full flex mb-4'>
							$Pokecult is a token to represent the community love for pokemon.
						</h2>
						<h4>
							Fees will be repurchased on the chart, in addition to a boost payment in the dex.
						</h4>
					</motion.section>

					<motion.div variants={itemVariants}>
						<EmblaCarousel slides={Slides} options={{ dragFree: true, loop: true }} />
					</motion.div>

					<motion.section
						className='p-6 flex flex-col gap-4 justify-center items-center'
						variants={itemVariants}
					>
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
						<a
							className='bg-[#264b7c] text-white border-4 border-black p-4 w-max font-bold text-2xl rotate-2 hover:rotate-0 transition-transform'
							href='https://x.com/i/communities/1958130076949619185'
							target='_blank'
						>
							Buy $POKECULT!
						</a>
					</motion.section>
				</div>
			</motion.main>
			<motion.div variants={slideUpVariants}>
				<AudioPlayer audioSrc='/audio/poke-theme.mp3' />
			</motion.div>
			<motion.footer
				className='w-full border-t py-3 bg-slate-900 text-white'
				variants={slideUpVariants}
			>
				<InfiniteTextCarousel
					text='BUY $POKECULT'
					className='text-sm font-medium'
					speed={40}
					gap={80}
				/>
			</motion.footer>
		</motion.div>
	);
}
