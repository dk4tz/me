import {
	Dispatch,
	MouseEventHandler,
	SetStateAction,
	useEffect,
	useRef
} from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeKey } from '../types';

interface BopButtonProps {
	isBopping: boolean;
	toggleBop: Dispatch<SetStateAction<boolean>>;
	themeKey?: ThemeKey;
}

export const BopButton: React.FC<BopButtonProps> = ({
	isBopping,
	toggleBop,
	themeKey = 'dance'
}) => {
	const { musicPath } = useTheme(themeKey);
	const audio = useRef(new Audio(musicPath)).current;

	useEffect(() => {
		audio.loop = true;

		if (isBopping) {
			audio.play().catch((error) => {
				console.error('Music playback failed:', error);
				toggleBop(false); // Reset state on error
			});
		} else {
			audio.pause();
		}

		return () => {
			audio.pause();
			audio.currentTime = 0; // Reset audio position on cleanup
		};
	}, [isBopping, audio, toggleBop]);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		toggleBop((prevBop) => !prevBop);
	};

	return (
		<button
			className='fixed bottom-4 right-4 flex h-[5vh] w-[5vh] items-center justify-center rounded bg-gray-500 bg-opacity-10 p-2 hover:bg-opacity-40'
			onClick={handleClick}
			aria-label={isBopping ? 'Pause music' : 'Play music'}
		>
			{isBopping ? '⏸️' : '🎧'}
		</button>
	);
};
