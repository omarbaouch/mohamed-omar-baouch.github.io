"""Editable Blender scene for the portfolio's eight-second precision study.

Run in Higgsfield 3D Jutsu (Blender 5.2); artifacts is provided by its worker.
All geometry is original. No client CAD data or external assets are used.
"""
import bpy
import math
from mathutils import Vector

S = bpy.context.scene
S.render.engine = 'BLENDER_EEVEE'
S.render.resolution_x = 1280
S.render.resolution_y = 960
S.render.resolution_percentage = 100
S.render.fps = 24
S.frame_start, S.frame_end = 1, 192
S.world = bpy.data.worlds.new('Midnight studio')
S.world.use_nodes = True
S.world.node_tree.nodes['Background'].inputs[0].default_value = (.022,.031,.055,1)
S.world.node_tree.nodes['Background'].inputs[1].default_value = .35

def material(name, color, metallic, roughness):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color,1)
    m.use_nodes = True
    p = m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (*color,1)
    p.inputs['Metallic'].default_value = metallic
    p.inputs['Roughness'].default_value = roughness
    return m

steel = material('Satin titanium',(.36,.42,.49),.95,.24)
edge = material('Polished machined edge',(.65,.7,.75),1,.16)
copper = material('Copper anodised rotor',(.53,.19,.085),.9,.25)
black = material('Graphite ceramic',(.018,.025,.038),.65,.27)
blue = material('Ice blue signal',(.1,.5,.85),.65,.22)
p = blue.node_tree.nodes.get('Principled BSDF')
p.inputs['Emission Color'].default_value = (.035,.25,.6,1)
p.inputs['Emission Strength'].default_value = 2
floor = material('Studio floor',(.012,.018,.029),.25,.3)

def finish(o, mat, parent=None, bevel=.015):
    o.data.materials.append(mat)
    for p in o.data.polygons: p.use_smooth = True
    if bevel:
        b=o.modifiers.new('Machined radii','BEVEL'); b.width=bevel; b.segments=3
        o.modifiers.new('Weighted surface normals','WEIGHTED_NORMAL')
    o.parent=parent
    return o

def lathe(name, profile, mat, parent, n=128):
    vertices=[(x,r*math.cos(2*math.pi*j/n),r*math.sin(2*math.pi*j/n)) for x,r in profile for j in range(n)]
    faces=[]
    for i in range(len(profile)):
        for j in range(n):
            k=(i+1)%len(profile)
            faces.append((i*n+j,i*n+(j+1)%n,k*n+(j+1)%n,k*n+j))
    mesh=bpy.data.meshes.new(name); mesh.from_pydata(vertices,[],faces); mesh.update()
    o=bpy.data.objects.new(name,mesh); S.collection.objects.link(o)
    return finish(o,mat,parent)

def ring(name,outer,inner,depth,mat,parent,x=0):
    return lathe(name,[(x-depth/2,inner),(x-depth/2,outer),(x+depth/2,outer),(x+depth/2,inner)],mat,parent)

def cylinder(name,r,depth,location,mat,parent,vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=r,depth=depth,location=location,rotation=(0,math.pi/2,0))
    o=bpy.context.object; o.name=name
    return finish(o,mat,parent,.008)

groups=[]
for name in ['Rear flange','Bearing housing','Copper rotor','Turbine wheel','Front locking collar']:
    g=bpy.data.objects.new(name,None); S.collection.objects.link(g); groups.append(g)

for idx,g in enumerate([groups[0],groups[4]]):
    ring('Flange body',1.23,.56,.16,steel,g)
    ring('Polished outer shoulder',1.24,1.17,.19,edge,g)
    ring('Graphite inner seal',.69,.55,.22,black,g)
    ring('Signal circumference',1.17,1.15,.17,blue,g)
    for j in range(12):
        a=j*math.tau/12; y,z=1.01*math.cos(a),1.01*math.sin(a)
        cylinder('Recessed socket',.09,.014,(.09,y,z),black,g)
        cylinder('Hex fastener',.057,.034,(.105,y,z),edge,g,6)
        cylinder('Socket centre',.022,.038,(.107,y,z),black,g,6)

lathe('Stepped bearing housing',[(-.32,.48),(-.32,.95),(-.23,.95),(-.23,1.08),(.21,1.08),(.21,.86),(.32,.86),(.32,.48)],steel,groups[1])
for x in [-.18,-.11,-.04,.03,.1,.17]: ring('Machined cooling groove',1.09,1.065,.019,black,groups[1],x)
ring('Bearing inner race',.65,.48,.67,edge,groups[1])
ring('Copper retaining ring',1.19,.81,.13,copper,groups[2])
ring('Rotor edge highlight',1.2,1.17,.14,edge,groups[2])
for j in range(32):
    a=j*math.tau/32
    cylinder('Rotor detail',.021,.148,(0,1.03*math.cos(a),1.03*math.sin(a)),black,groups[2],12)

ring('Turbine outer rim',1.04,.97,.12,steel,groups[3])
ring('Turbine hub',.45,.26,.36,copper,groups[3])
for j in range(24):
    a=j*math.tau/24
    vertices=[]
    for x in [-.08,.08]:
        for r,t in [(.42,a),(.98,a+.21),(.98,a+.29),(.42,a+.12)]:
            vertices.append((x,r*math.cos(t),r*math.sin(t)))
    mesh=bpy.data.meshes.new('Swept blade'); mesh.from_pydata(vertices,[],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]);mesh.update()
    o=bpy.data.objects.new('Swept turbine blade',mesh);S.collection.objects.link(o);finish(o,steel,groups[3],.012)

shaft=bpy.data.objects.new('Central spindle',None); S.collection.objects.link(shaft)
cylinder('Precision spindle',.245,3.9,(0,0,0),steel,shaft)
for x in [-1.8,1.8]: ring('Spindle collar',.3,.23,.08,copper,shaft,x)

for frame in range(1,194,8):
    t=(frame-1)/192*math.tau
    expansion=(1-math.cos(t))/2
    for i,g in enumerate(groups):
        g.location.x=(i-2)*(.44+.84*expansion)
        g.rotation_euler.x=(.22*math.sin(t)+(math.tau*(frame-1)/192 if i==3 else 0))
        g.keyframe_insert(data_path='location',frame=frame)
        g.keyframe_insert(data_path='rotation_euler',frame=frame)

bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-1.55))
bpy.context.object.name='Infinite studio floor';bpy.context.object.data.materials.append(floor)

def aim(o,point=(0,0,0)):
    o.rotation_euler=(Vector(point)-o.location).to_track_quat('-Z','Y').to_euler()

def light(name,location,power,color,size,shape='DISK',size_y=None):
    d=bpy.data.lights.new(name,'AREA');d.energy=power;d.color=color;d.shape=shape;d.size=size
    if size_y is not None: d.size_y=size_y
    o=bpy.data.objects.new(name,d);S.collection.objects.link(o);o.location=location;aim(o)

light('Long overhead softbox',(0,-3,6),1900,(.8,.9,1),7,'RECTANGLE',2)
light('Warm edge softbox',(2,4,3),2100,(1,.57,.3),5,'RECTANGLE',1)
light('Cool frontal fill',(-4,-5,1),1200,(.4,.65,1),4)
light('White rim',(-3,2,5),2400,(.85,.92,1),4,'RECTANGLE',1)

d=bpy.data.cameras.new('Delivery camera');cam=bpy.data.objects.new('Delivery camera',d);S.collection.objects.link(cam);S.camera=cam
d.lens=48
for frame in range(1,194,8):
    t=(frame-1)/192*math.tau
    cam.location=(6.5+.35*math.sin(t),-10.2,5.2+.15*math.sin(t))
    aim(cam,(0,0,-.1));cam.keyframe_insert(data_path='location',frame=frame);cam.keyframe_insert(data_path='rotation_euler',frame=frame)
S.frame_set(97)
S.render.image_settings.media_type='IMAGE'
S.render.image_settings.file_format='PNG'
target=artifacts.file(name='precision-preview.png',media_type='image/png')
S.render.filepath=str(target.path)
bpy.ops.render.render(write_still=True)
target.publish()
result={'objects':len(bpy.data.objects),'frames':192,'fps':24,'preview_frame':97}
