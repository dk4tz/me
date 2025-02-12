import { ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { BopButton } from '../components/BopButton';
import { Loader } from '../components/Loader';
import { Portrait } from '../components/Portrait';
import { ThemeKey } from '../types';
import HomeOverlay from './HomeOverlay';

export const HomeScreen: React.FC = () => {
	const [isBopping, setIsBopping] = useState(false);
	const [themeKey] = useState<ThemeKey>('ny');

	return (
		<Suspense fallback={<Loader />}>
			<Canvas
				shadows
				camera={{ position: [0, 0, 150], fov: 55 }}
				aria-label='hero-sculpture'
			>
				<ScrollControls pages={4} damping={0.5}>
					<Portrait isBopping={isBopping} themeKey={themeKey} />
					<HomeOverlay />
				</ScrollControls>
			</Canvas>
			<BopButton
				isBopping={isBopping}
				toggleBop={setIsBopping}
				themeKey={themeKey}
			/>
		</Suspense>
	);
};
