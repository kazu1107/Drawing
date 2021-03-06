#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/11.
//
in  vec4    color;
in  vec2    uv;
out vec4    oColor;

float bw = 0.025;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main( void ) {
    
    float   fy = float(uv.y * 128);
    int     iy = int(fy);
    float   py = fy - float(iy);
    
    float h = rand(vec2(iy,iy));
    float s = rand(vec2(iy+1, iy+1));
    float v = rand(vec2(iy+2, iy+2));
    vec3 color = hsv2rgb(vec3(h, s, 1-v*0.2));
    
    if (py > 0.5){
        py = 1 - py;
    }
    py *= 1.2;
    color.rgb *= py;
    color.rgb = 1-color.rgb;
    
    oColor = vec4(color.rgb, 1);
}
