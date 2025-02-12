import { Bounds, ContactShadows, OrbitControls } from '@react-three/drei';
import { ThemeKey } from '../types';
import { Background } from './Background';
import { Hero } from './Hero';
import { Lights } from './Lights';

interface PortraitProps {
	isBopping: boolean;
	themeKey: ThemeKey;
}

export const Portrait = ({ isBopping, themeKey }: PortraitProps) => {
	const isDesktop = window.innerWidth >= 640;
	return (
		<>
			<Background themeKey={themeKey} isBopping={isBopping} />
			<Lights />
			<Bounds fit clip observe margin={0.5} damping={2}>
				<Hero bop={isBopping} themeKey={themeKey} />
				<ContactShadows position={[0, -2.4, 0]} blur={2} />
			</Bounds>

			{isDesktop && (
				<OrbitControls
					makeDefault
					enableZoom={false}
					enablePan={false}
					maxPolarAngle={Math.PI / 2}
				/>
			)}
		</>
	);
};
