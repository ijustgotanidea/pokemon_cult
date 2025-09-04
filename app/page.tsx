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
			className='font-sans flex flex-col items-center justify-items-center min-h-screen gap-8 md:gap-12 lg:gap-16 overflow-x-hidden'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			<motion.header className='text-center p-4 md:p-8' variants={itemVariants}>
				<Image
					src='/pokecult-logo.png'
					alt='$POKECULT'
					width={800}
					height={800}
					className='w-full max-w-[300px] md:max-w-[500px] lg:max-w-[800px] mx-auto'
					priority
				/>
				<p className='font-bold text-white'>CA: Coming soon!</p>
			</motion.header>
			<motion.main className='w-full flex-1' variants={itemVariants}>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-6 md:px-12 lg:px-24'>
					<motion.section
						className='flex flex-col gap-1 max-w-full md:max-w-96'
						variants={itemVariants}
					>
						<h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-white w-full flex flex-wrap mb-4'>
							$Pokecult is a token to represent the community love for pokemon.
						</h2>
						<h4 className='text-sm md:text-base'>
							Fees will be repurchased on the chart, in addition to a boost payment in the dex.
						</h4>
					</motion.section>

					<motion.div variants={itemVariants}>
						<EmblaCarousel slides={Slides} options={{ dragFree: true, loop: true }} />
					</motion.div>

					<motion.section
						className='p-4 md:p-6 flex flex-col gap-3 md:gap-4 justify-center items-center'
						variants={itemVariants}
					>
						<div className='flex flex-row gap-3 md:gap-4 justify-center items-center'>
							<a
								className='text-xl font-bold text-white mb-2 md:mb-4 rounded-full p-2 bg-white border border-black border-r-2 md:border-r-3 border-b-2 md:border-b-3'
								href='https://x.com/i/communities/1958130076949619185'
								target='_blank'
								aria-label='Twitter Community'
							>
								<FaXTwitter className='text-black h-6 w-6 md:h-9 md:w-9' />
							</a>
							<a
								className='text-xl font-bold text-white mb-2 md:mb-4 rounded-full p-2 bg-white border border-black border-r-2 md:border-r-3 border-b-2 md:border-b-3'
								href=''
								aria-label='Pill Link'
							>
								<Pill className='text-black h-6 w-6 md:h-9 md:w-9' />
							</a>
						</div>
						<a
							className='bg-[#264b7c] text-white border-3 md:border-4 border-black p-3 md:p-4 w-max font-bold text-xl md:text-2xl rotate-2 hover:rotate-0 transition-transform'
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
				className='w-full border-t py-2 md:py-3 bg-slate-900 text-white'
				variants={slideUpVariants}
			>
				<InfiniteTextCarousel
					text='BUY $POKECULT'
					className='text-xs sm:text-sm font-medium'
					speed={40}
					gap={50}
				/>
			</motion.footer>
		</motion.div>
	);
}
