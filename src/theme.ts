import chroma from 'chroma-js';
import { ThemeConfig, ThemeKey } from './types';

export const themes: Record<ThemeKey, ThemeConfig> = {
	dance: {
		baseColor: '#1A1818',
		activeColor: (time) => {
			const noise = (Math.random() - 0.5) * 0.001;
			const value = Math.floor(
				((Math.sin(time / 10) + noise) * 0.5 + 0.5) * 360
			);
			return chroma.hsl(value, 1, 0.75).hex();
		},
		decalText: 'alors on danse',
		musicPath: `${import.meta.env.BASE_URL}music/zhu_japan.mp3`
	},
	ny: {
		baseColor: '#1A1818',
		activeColor: () => '#005DFF',
		decalText: 'new york, new york',
		musicPath: `${import.meta.env.BASE_URL}music/sinatra_nyny.mp3`
	}
};
