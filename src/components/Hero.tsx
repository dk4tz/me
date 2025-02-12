import {
	Decal,
	PerspectiveCamera,
	RenderTexture,
	Text,
	useGLTF
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

import { useTheme } from '../hooks/useTheme';
import { ThemeKey } from '../types';

type HeroGLTF = GLTF & {
	nodes: {
		[key: string]: THREE.Mesh;
	};
};

interface HeroProps {
	bop: boolean;
	themeKey: ThemeKey;
}

export const Hero: React.FC<HeroProps> = ({ bop, themeKey }) => {
	const heroPath = `${import.meta.env.BASE_URL}models/k4t.glb`;

	// Refs
	const textRef = useRef<THREE.Mesh>(null);
	const groupRef = useRef<THREE.Group>(null);

	// State
	const [decalColor, setDecalColor] = useState('#000000');

	// Theme
	const { computeColor, decalText } = useTheme(themeKey);

	// Model
	const { nodes } = useGLTF(heroPath) as HeroGLTF;

	// Memoized computations
	const material = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				color: '#000000',
				roughness: 0.25,
				metalness: 0.5
			}),
		[]
	);

	const heroGeometry = useMemo(() => {
		const geometries = Object.values(nodes)
			.filter((node) => node.geometry && node.geometry.index)
			.map((node) => node.geometry) as THREE.BufferGeometry[];
		return BufferGeometryUtils.mergeGeometries(geometries);
	}, [nodes]);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();

		// Update decal position and color
		if (textRef.current) {
			textRef.current.position.x = Math.sin(t) * 10;
		}
		setDecalColor(computeColor());

		// Animate
		if (groupRef.current) {
			if (bop) {
				groupRef.current.rotation.x += 0.01;
				groupRef.current.rotation.y -= 0.01;
				groupRef.current.rotation.z += 0.001;
			} else {
				groupRef.current.position.y = Math.sin(t) / 10;
			}
		}
	});

	return (
		<group
			ref={groupRef}
			name='hero'
			position={[0, 0, 0]}
			rotation={[-2.354, 1.212, 2.42]}
			castShadow
			receiveShadow
		>
			<mesh
				material={material}
				castShadow
				receiveShadow
				geometry={heroGeometry}
				dispose={null}
			>
				<Decal
					position={[-0.5, -0.75, -0.25]}
					rotation={[-2.25, 1.7, 2.25]}
					scale={[1, 0.3, 1.2]}
				>
					<meshStandardMaterial
						roughness={0.6}
						transparent
						opacity={1}
						emissive={'#000000'}
					>
						<RenderTexture attach='map' anisotropy={16}>
							<PerspectiveCamera
								makeDefault
								manual
								aspect={0.9 / 0.25}
								position={[0, 0, 5]}
							/>
							<color attach='background' args={[decalColor]} />
							<Text
								rotation={[0, Math.PI, 0]}
								ref={textRef}
								fontSize={4}
								color='white'
							>
								{bop ? decalText : 'david hariton katz'}
							</Text>
						</RenderTexture>
					</meshStandardMaterial>
				</Decal>
			</mesh>
		</group>
	);
};

// Preload the model for better performance
useGLTF.preload(`${import.meta.env.BASE_URL}models/k4t.glb`);
