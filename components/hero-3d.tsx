"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork({ count = 200, connectionDistance = 3.5 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    // Generate random points in a sphere
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const r = 10 + Math.random() * 5; // Radius variance
            const x = r * Math.cos(theta) * Math.sin(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(phi);

            temp.push({
                pos: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                originalPos: new THREE.Vector3(x, y, z)
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    // Frame loop for animation
    useFrame((state) => {
        if (!meshRef.current || !linesRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = [];

        // Animate particles
        particles.forEach((particle, i) => {
            // Wave motion
            const waveX = Math.sin(time * 0.5 + particle.pos.y * 0.1) * 0.5;
            const waveY = Math.cos(time * 0.3 + particle.pos.x * 0.1) * 0.5;

            // Gentle rotation + wave
            particle.pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.001);

            dummy.position.copy(particle.pos).add(new THREE.Vector3(waveX, waveY, 0));
            dummy.scale.setScalar(0.08 + Math.sin(time * 2 + i) * 0.03); // Pulsing size
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);

            // Store for line calculation
            positions.push(dummy.position.clone());
        });

        meshRef.current.instanceMatrix.needsUpdate = true;

        // Connect lines
        const linePositions = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = positions[i].distanceTo(positions[j]);
                if (dist < connectionDistance) {
                    linePositions.push(
                        positions[i].x, positions[i].y, positions[i].z,
                        positions[j].x, positions[j].y, positions[j].z
                    );
                }
            }
        }

        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        linesRef.current.geometry = linesGeometry;
    });

    return (
        <group rotation={[0, 0, Math.PI / 8]}>
            {/* Nodes (Points) */}
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#00f2ff" toneMapped={false} />
            </instancedMesh>

            {/* Connections (Lines) */}
            <lineSegments ref={linesRef}>
                <lineBasicMaterial color="#8a2be2" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 30], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <NeuralNetwork />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}
