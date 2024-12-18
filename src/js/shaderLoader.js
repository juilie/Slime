// src/js/shaderLoader.js
import vertShader from '../shaders/vert.glsl';
import originalSimShader from '../shaders/original/sim.glsl';
import originalRenderShader from '../shaders/original/render.glsl';
import glassSimShader from '../shaders/glass/sim.glsl';
import glassRenderShader from '../shaders/glass/render.glsl';
import dissolveSimShader from '../shaders/dissolve/sim.glsl';
import dissolveRenderShader from '../shaders/dissolve/render.glsl';
import imageSimShader from '../shaders/image/sim.glsl';
import imageRenderShader from '../shaders/image/render.glsl';
import modernSimShader from '../shaders/modern/sim.glsl';
import modernRenderShader from '../shaders/modern/render.glsl';
import tarSimShader from '../shaders/tar/sim.glsl';
import tarRenderShader from '../shaders/tar/render.glsl';

import originalConfig from '../shaders/original/config.json';
import glassConfig from '../shaders/glass/config.json';
import dissolveConfig from '../shaders/dissolve/config.json';
import imageConfig from '../shaders/image/config.json';
import modernConfig from '../shaders/modern/config.json';
import tarConfig from '../shaders/tar/config.json';

export const shaders = {
    vert: vertShader,
    original: {
        sim: originalSimShader,
        render: originalRenderShader,
        config: originalConfig
    },
    glass: {
        sim: glassSimShader,
        render: glassRenderShader,
        config: glassConfig
    },
    dissolve: {
        sim: dissolveSimShader,
        render: dissolveRenderShader,
        config: dissolveConfig
    },
    image: {
        sim: imageSimShader,
        render: imageRenderShader,
        config: imageConfig
    },
    modern: {
        sim: modernSimShader,
        render: modernRenderShader,
        config: modernConfig
    },
    tar: {
        sim: tarSimShader,
        render: tarRenderShader,
        config: tarConfig
    }
};