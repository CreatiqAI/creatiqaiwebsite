"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleStream({ count = 800, speed = 0.1 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const [hovered, setHovered] = useState(false);
    const scrollRef = useRef(0);

    // Target speed multiplier
    const speedMultiplier = useRef(1);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Generate initial particles in a long tunnel
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 15; // Tunnel width
            const z = (Math.random() - 0.5) * 100; // Tunnel length

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            temp.push({
                pos: new THREE.Vector3(x, y, z),
                speedOffset: Math.random() * 0.5 + 0.5,
                size: Math.random() * 0.5 + 0.1
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Calculate scroll impact - fast zoom when scrolling down
        // Normalize scroll: after 100px scroll, we add significant speed
        const scrollFactor = scrollRef.current / 100;

        // Smooth acceleration on hover AND scroll
        // Hover adds 2.0 speed, Scroll adds dynamic speed
        const targetSpeed = (hovered ? 3.0 : 1.0) + (scrollFactor * 2.0);

        speedMultiplier.current = THREE.MathUtils.lerp(speedMultiplier.current, targetSpeed, 0.1);

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            // Move particle towards camera (positive Z)
            particle.pos.z += speed * particle.speedOffset * speedMultiplier.current;

            // Reset if too close
            if (particle.pos.z > 20) {
                particle.pos.z = -80;
            }

            // Static Spiral motion (no time-based rotation)
            // "dont spin when the cursor move/zoom" -> we remove the 'time' factor from angle
            const zNorm = (particle.pos.z + 80) / 100; // 0 to 1
            const angle = i; // Static angle based on index, no spinning

            // Gentle curve based on time to make it feel alive, but NOT spinning
            // just a slight drift
            const xOffset = Math.sin(time * 0.2 + zNorm * 2) * 2;
            const yOffset = Math.cos(time * 0.1 + zNorm * 2) * 2;

            const radius = 8 + zNorm * 5; // Wider as it gets closer

            dummy.position.x = Math.cos(angle) * radius + xOffset;
            dummy.position.y = Math.sin(angle) * radius + yOffset;
            dummy.position.z = particle.pos.z;

            // Stretch effect based on speed (Star Wars warp speed look)
            const scaleZ = 1 + (speedMultiplier.current - 1) * 3;
            dummy.scale.set(particle.size, particle.size, particle.size * scaleZ);

            dummy.rotation.z = angle;

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[0.2, 0.2, 1]} />
                <meshBasicMaterial color="#00f2ff" toneMapped={false} />
            </instancedMesh>

            {/* Invisible plane for hover detection over the whole scene */}
            <mesh
                position={[0, 0, 10]}
                visible={false}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <planeGeometry args={[100, 100]} />
            </mesh>
        </>
    );
}

export default function HeroStream() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={['#050510', 5, 60]} />
                <ParticleStream />
            </Canvas>
        </div>
    );
}
