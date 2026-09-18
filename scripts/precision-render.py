"""Render lightweight fallback keyframes in 3D Jutsu.

The primary site experience renders the GLB in real time. This smaller export
is only for devices without WebGL. Interpolate the returned opening sequence,
append its reverse and encode H.264 yuv420p with +faststart for the fallback.
"""
import bpy

FIRST, LAST, NAME = 1, 97, 'precision-keyframes.mp4'
s = bpy.context.scene
bpy.data.objects['Infinite studio floor'].hide_render = True
for light in bpy.data.lights:
    light.use_shadow = False
s.render.engine = 'BLENDER_EEVEE'
s.eevee.taa_render_samples = 4
s.render.resolution_x, s.render.resolution_y = 640, 480
s.render.resolution_percentage = 100
s.frame_start, s.frame_end = FIRST, LAST
s.frame_step = 8
s.render.fps = 3
s.render.image_settings.media_type = 'VIDEO'
s.render.image_settings.file_format = 'FFMPEG'
s.render.ffmpeg.format = 'MPEG4'
s.render.ffmpeg.codec = 'H264'
s.render.ffmpeg.constant_rate_factor = 'HIGH'
target = artifacts.file(name=NAME, media_type='video/mp4')
s.render.filepath = str(target.path)
bpy.ops.render.render(animation=True)
target.publish()
result = {'frames': [FIRST, LAST]}
