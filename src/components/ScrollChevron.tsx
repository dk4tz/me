import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ScrollChevronProps {
	targetOffset?: number;
	onClick?: () => void;
	className?: string;
}

export const ScrollChevron: React.FC<ScrollChevronProps> = ({
	targetOffset = 1,
	onClick,
	className = '',
	...props
}) => {
	const { computeColor } = useTheme();
	const [chevronColor, setChevronColor] = useState('#000000');
	const scroll = useScroll();

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			if (!scroll.el) return;

			scroll.el.scrollTo({
				top: targetOffset * scroll.el.scrollHeight,
				behavior: 'smooth'
			});

			onClick?.();
		},
		[scroll.el, targetOffset, onClick]
	);

	useFrame(() => {
		const newColor = computeColor();
		if (newColor !== chevronColor) {
			setChevronColor(newColor);
		}
	});

	return (
		<button
			className={`mt-auto cursor-pointer ${className}`}
			aria-label='Scroll to the next page'
			onClick={handleClick}
			{...props}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 16 16'
				className='h-12 w-12 animate-bounce'
				style={{ color: chevronColor }}
			>
				<path
					fill='currentColor'
					fillRule='evenodd'
					d='M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67'
				/>
			</svg>
		</button>
	);
};
