import { useCallback, useRef } from 'react';
import * as THREE from 'three';
import { themes } from '../theme';
import { ThemeKey } from '../types';

export const useTheme = (themeKey: ThemeKey = 'dance') => {
	const clockRef = useRef(new THREE.Clock());
	const theme = themes[themeKey];

	const computeColor = useCallback(
		() => theme.activeColor(clockRef.current.getElapsedTime()),
		[theme]
	);

	return {
		baseColor: theme.baseColor,
		computeColor,
		musicPath: theme.musicPath,
		decalText: theme.decalText
	};
};
