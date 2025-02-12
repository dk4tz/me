import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useTheme } from '../hooks/useTheme';
import { ThemeKey } from '../types';

interface BackgroundProps {
	themeKey: ThemeKey;
	isBopping: boolean;
}

export const Background = ({ themeKey, isBopping }: BackgroundProps) => {
	const { computeColor, baseColor } = useTheme(themeKey);

	useFrame(({ scene }) => {
		if (!scene.background) scene.background = new THREE.Color();
		if (scene.background instanceof THREE.Color) {
			scene.background.set(isBopping ? computeColor() : baseColor);
		}
	});

	return null;
};
