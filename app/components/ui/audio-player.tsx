'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume } from 'lucide-react';

type AudioPlayerProps = {
	audioSrc: string;
};

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
	};

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<motion.div
			className={`fixed bottom-4 right-4 z-50 backdrop-blur-sm rounded-full shadow-md ${
				isVisible ? 'bg-black/30' : 'bg-violet-900/50'
			}`}
			animate={{
				width: isVisible ? 160 : 50,
				height: isVisible ? 48 : 40,
				borderRadius: 24,
			}}
			transition={{ duration: 0.2 }}
			initial={{ width: 40, height: 40 }}
		>
			<audio ref={audioRef} src={audioSrc} loop />

			<div className='flex items-center h-full w-full px-2'>
				<button
					onClick={togglePlay}
					className='rounded-full w-8 h-8 flex items-center justify-center text-white hover:text-violet-200 transition-colors'
				>
					{isPlaying ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<rect x='6' y='4' width='4' height='16' />
							<rect x='14' y='4' width='4' height='16' />
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<polygon points='5 3 19 12 5 21 5 3' />
						</svg>
					)}
				</button>

				{isVisible && (
					<motion.div
						className='flex items-center flex-1 gap-2 pl-1'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
					>
						<input
							type='range'
							min='0'
							max='1'
							step='0.01'
							value={volume}
							onChange={handleVolumeChange}
							className='w-full h-1 bg-violet-500 rounded-lg appearance-none cursor-pointer'
						/>
					</motion.div>
				)}

				<button
					onClick={toggleVisibility}
					className='w-4 h-4 flex items-center justify-center text-white hover:text-violet-200 ml-1'
				>
					<Volume />
				</button>
			</div>
		</motion.div>
	);
}
