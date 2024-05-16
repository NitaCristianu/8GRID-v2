import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useAtom } from 'jotai';
import useResize from '@/app/scene/[id]/hooks/useResize';

const BACKGROUND_SHADER = `
    uniform vec2 offset;
    uniform vec2 size;
    uniform vec3 background;
    uniform float time;

    vec3 rgb(in int r, in int g, in int b){
        return vec3(float(r), float(g),float(b)) / 255.;
    }

    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    float drawGrid(vec2 uv){
        vec2 grid_uv = fract(uv);
        return max(grid_uv.x, grid_uv.y);
    }

    void main() {
        vec2 st = gl_FragCoord.xy / size;
        st.x *= size.x / size.y;
        float zoom = 10.;
        float thickness = 1.;
        float line_thickness = zoom * thickness / size.y;
        vec3 color1 = mix(rgb(99, 99, 159), rgb(74, 74, 74), (st.y - 0.5)*0.2);
        vec3 color2 = rgb(0, 0, 0);
        vec3 grid_col = vec3(step(1.-line_thickness, drawGrid(st * 25.)));
        // vec3 color1 = rgb(43, 107, 217);
        // vec3 color2 = rgb(0, 42, 144);
        //vec3 color1 = background / 255.;
        //vec3 color2 = background / 255. * 0.5;
        st.y += sin(time/30000.);
        st.x += cos(time/30000.);
        float t = noise(st * 2.2);
        vec3 col = color1 + (color2 - color1) * t;
        if (grid_col.x == 1.) col = mix(col, vec3(1,1,1), 0.5);
        col *= col;

        gl_FragColor = vec4(col, 1.);
    }
`;

const Background = () => {
    const size = useResize();
    const [time, setTime] = useState(0);
    const uniformsRef = useRef({
        offset: new THREE.Uniform(new THREE.Vector2(0, 0)),
        size: new THREE.Uniform(new THREE.Vector2(size.x, size.y)),
        background: new THREE.Uniform(new THREE.Vector3(0,0,0)),
        time : new THREE.Uniform(time)
    });

    return (
        <Canvas style={{ position: 'absolute', width: '100%', height: '500%' }}>
            <mesh>
                <planeGeometry args={[size.x, size.y]} />
                <shaderMaterial uniforms={uniformsRef.current} fragmentShader={BACKGROUND_SHADER} />
            </mesh>
        </Canvas>
    );
};

export default Background;
