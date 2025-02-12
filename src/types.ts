export type ThemeKey = 'dance' | 'ny';

export interface ThemeConfig {
	baseColor: string;
	activeColor: (time: number) => string;
	decalText: string;
	musicPath: string;
}
