"""Original procedural motion studies. Requires Pillow, numpy and ffmpeg.
Run: python3 scripts/render-motion.py
No stock footage or client/project data is used.
"""
from pathlib import Path
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw

W, H, FPS, FRAMES = 960, 720, 24, 192
OUT = Path(__file__).resolve().parents[1] / 'public' / 'motion'
OUT.mkdir(parents=True, exist_ok=True)
yy, xx = np.mgrid[:H, :W]
glow = np.exp(-(((xx-W*.55)/(W*.55))**2 + ((yy-H*.48)/(H*.65))**2)*3)
bg = np.stack([8+glow*13, 12+glow*17, 19+glow*24], axis=-1).astype('uint8')

def project(p, turn):
    x,y,z=p
    a=turn; b=-.48
    x,z=x*math.cos(a)+z*math.sin(a), -x*math.sin(a)+z*math.cos(a)
    y,z=y*math.cos(b)-z*math.sin(b), y*math.sin(b)+z*math.cos(b)
    k=650/(900-z)
    return (W*.5+x*k,H*.5+y*k,z)

def assembly(t):
    im=Image.fromarray(bg.copy()); d=ImageDraw.Draw(im)
    for x in range(0,W,48): d.line((x,0,x,H), fill=(20,27,35))
    for y in range(0,H,48): d.line((0,y,W,y), fill=(20,27,35))
    turn=.5+t*math.tau
    opening=(1-math.cos(t*math.tau))*.5
    faces=[]
    for level in range(5):
        cy=(level-2)*(24+opening*64)
        r=190 if level in (0,4) else 150
        for i in range(80):
            a=i*math.tau/80; b=(i+1)*math.tau/80
            for j in range(10):
                c=j*math.tau/10; e=(j+1)*math.tau/10
                pts=[]
                for u,v in [(a,c),(b,c),(b,e),(a,e)]:
                    rr=r+22*math.cos(v)
                    pts.append(project((rr*math.cos(u),cy+22*math.sin(v),rr*math.sin(u)),turn))
                light=.3+.7*max(0, math.sin(a+.4)*math.cos(c)*.6-math.sin(c)*.6)
                color=tuple(int(v*light) for v in ((230,142,78) if level==2 else (150,179,198)))
                faces.append((sum(p[2] for p in pts)/4,[(p[0],p[1]) for p in pts],color))
    for _,pts,col in sorted(faces): d.polygon(pts,fill=col)
    # A fine projected datum axis and orbit are a nod to CAO viewports.
    for y in [-290,290]:
        p=project((0,y,0),turn)
        d.line((p[0]-8,p[1],p[0]+8,p[1]), fill=(99,170,216),width=1)
        d.line((p[0],p[1]-8,p[0],p[1]+8), fill=(99,170,216),width=1)
    return im

def stream(t):
    im=Image.fromarray(bg.copy()); d=ImageDraw.Draw(im)
    phase=t*math.tau
    for row in range(38):
        pts=[]
        for i in range(150):
            x=(i/149-.5)*1000
            z=(row-19)*15
            y=80*math.sin(x*.008+phase+row*.085)+35*math.cos(x*.014-phase)
            p=project((x,y,z),-.32)
            pts.append((p[0],p[1]))
        col=(179,115,74) if row%7==0 else (43+row*2,76+row*2,99+row*2)
        d.line(pts,fill=col,width=1)
        for k in range(0,150,10):
            x,y=pts[k]; d.ellipse((x-1,y-1,x+1,y+1), fill=(166,199,214))
    return im

for name,render in [('assembly',assembly),('dataflow',stream)]:
    render(.25 if name == 'assembly' else 0).save(OUT/f'{name}.jpg',quality=88,optimize=True)
    target=OUT/f'{name}.mp4'
    temporary=OUT/f'{name}.render.mp4'
    proc=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-vcodec','rawvideo',
        '-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an',
        '-c:v','libx264','-preset','medium','-crf','32','-pix_fmt','yuv420p',
        '-movflags','+faststart',str(temporary)],stdin=subprocess.PIPE)
    for frame in range(FRAMES):
        proc.stdin.write(render(frame/FRAMES).tobytes())
    proc.stdin.close()
    if proc.wait(): raise RuntimeError('ffmpeg failed')
    subprocess.run(['ffmpeg','-v','error','-i',str(temporary),'-f','null','-'],check=True)
    temporary.replace(target)
    print(f'{target.name}: {target.stat().st_size} bytes',flush=True)
