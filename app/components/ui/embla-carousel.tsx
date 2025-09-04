import React, { useCallback, useEffect, useRef } from 'react';
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
	slides: { id: number; src: string; description?: string }[];
	options?: EmblaOptionsType;
};

const EmblaCarousel = ({ slides, options }: PropType) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const tweenFactor = useRef(0);
	const tweenNodes = useRef<HTMLElement[]>([]);

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes().map(slideNode => {
			return slideNode.querySelector('.embla__parallax__layer') as HTMLElement;
		});
	}, []);

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
	}, []);

	const tweenParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
		const engine = emblaApi.internalEngine();
		const scrollProgress = emblaApi.scrollProgress();
		const slidesInView = emblaApi.slidesInView();
		const isScrollEvent = eventName === 'scroll';

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex];

			slidesInSnap.forEach(slideIndex => {
				if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach(loopItem => {
						const target = loopItem.target();

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target);

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress);
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress);
							}
						}
					});
				}

				const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
				const tweenNode = tweenNodes.current[slideIndex];
				tweenNode.style.transform = `translateX(${translate}%)`;
			});
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		setTweenNodes(emblaApi);
		setTweenFactor(emblaApi);
		tweenParallax(emblaApi);

		emblaApi
			.on('reInit', setTweenNodes)
			.on('reInit', setTweenFactor)
			.on('reInit', tweenParallax)
			.on('scroll', tweenParallax)
			.on('slideFocus', tweenParallax);
	}, [emblaApi, tweenParallax]);

	return (
		<div className='max-w-6xl mx-auto [--slide-height:32rem] [--slide-spacing:1.5rem] [--slide-size:90%]'>
			<div className='overflow-hidden' ref={emblaRef}>
				<div className='flex touch-pan-y touch-pinch-zoom -ml-6'>
					{slides.map(slide => (
						<div className='transform translate3d-0 flex-[0_0_90%] min-w-0 pl-6' key={slide.id}>
							<div className='rounded-3xl h-full overflow-hidden shadow-sm bg-white/10 backdrop-blur-sm pb-2'>
								<div className='embla__parallax__layer relative h-[28rem] w-full flex justify-center'>
									<Image
										className='rounded-t-3xl block h-[28rem] w-full object-cover object-center max-w-none flex-[0_0_calc(115%+3rem)]'
										src={slide.src}
										alt={slide.description || 'Carousel image'}
										width={1200}
										height={800}
										priority
									/>
								</div>
								{slide.description && (
									<div className='p-4 text-center'>
										<p className='text-white text-sm font-medium leading-relaxed'>
											{slide.description}
										</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
