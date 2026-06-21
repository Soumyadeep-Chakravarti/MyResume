// src/labs/rain-test/rain.frag
precision highp float;

uniform float uTime;
uniform sampler2D uTexture; // The Cliffside Image
varying vec2 vUv;

void main() {
    // Basic noise-based distortion to simulate heavy drips
    vec2 distortion = vec2(
        sin(vUv.y * 10.0 + uTime) * 0.02,
        cos(vUv.x * 10.0 + uTime) * 0.02
    );

    // Sample the scene texture with distorted UVs
    vec4 color = texture2D(uTexture, vUv + distortion);

    gl_FragColor = color;
}
