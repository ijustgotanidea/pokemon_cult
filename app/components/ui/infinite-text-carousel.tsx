'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface InfiniteTextCarouselProps {
	text: string;
	className?: string;
	speed?: number; // Animation speed in pixels per second
	gap?: number; // Gap between repeated text elements in pixels
	separator?: string; // Optional separator between repeated texts
}

export function InfiniteTextCarousel({
	text,
	className,
	speed = 50,
	gap = 50,
	separator = ' • ',
}: InfiniteTextCarouselProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current || !textRef.current) return;

		const textWidth = textRef.current.offsetWidth;
		const cloneCount = Math.ceil(window.innerWidth / textWidth) + 1;

		// Create clones to ensure smooth infinite scrolling
		const animationContainer = containerRef.current;
		animationContainer.innerHTML = '';

		// Add initial text element
		const initialText = document.createElement('div');
		initialText.className = 'text-item m-2';
		initialText.innerText = text;
		animationContainer.appendChild(initialText);

		// Add separator if specified
		if (separator) {
			const separatorEl = document.createElement('div');
			separatorEl.className = 'separator';
			separatorEl.innerText = ` ${separator} `;
			animationContainer.appendChild(separatorEl);
		}

		// Add clones
		for (let i = 0; i < cloneCount; i++) {
			const clone = document.createElement('div');
			clone.className = 'text-item m-2';
			clone.innerText = text;
			animationContainer.appendChild(clone);

			// Add separator after each clone except the last one
			if (separator && i < cloneCount - 1) {
				const separatorEl = document.createElement('div');
				separatorEl.className = 'separator';
				separatorEl.innerText = `${separator}`;
				animationContainer.appendChild(separatorEl);
			}
		}

		// Calculate animation duration based on text width and desired speed
		const textElements = animationContainer.querySelectorAll('.text-item');
		const firstElement = textElements[0] as HTMLDivElement;
		const actualWidth = firstElement.offsetWidth + gap;
		const duration = actualWidth / speed;

		// Apply animation
		const animation = animationContainer.animate(
			[{ transform: 'translateX(0)' }, { transform: `translateX(-${actualWidth}px)` }],
			{
				duration: duration * 1000, // Convert to milliseconds
				iterations: Infinity,
				easing: 'linear',
			}
		);

		return () => {
			animation.cancel();
		};
	}, [text, speed, gap, separator]);

	return (
		<div className={cn('w-full overflow-hidden', className)}>
			<div className='flex items-center whitespace-nowrap' ref={containerRef}>
				<div className='text-item m-2' ref={textRef}>
					{text}
				</div>
			</div>
		</div>
	);
}
