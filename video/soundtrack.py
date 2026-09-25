"""Bande-son du film, synthétisée de zéro (aucun échantillon externe, donc aucun droit à gérer).

120 BPM : chaque coupe du film tombe sur un temps. Les instants ci-dessous doivent
rester alignés sur les scènes de film.html.
Usage : python3 soundtrack.py sortie.wav [durée]
"""
import sys
import wave
import numpy as np

SR = 44100
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 53.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)

CUTS = [4.5, 11, 16, 23.5, 31.5, 37.5, 42.5, 46]
DROP, END_BEAT = 4.5, 46.0
BEAT = 0.5


def note(n):  # numéro MIDI -> Hz
    return 440.0 * 2 ** ((n - 69) / 12)


def put(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    L[i : i + len(sig)] += sig * np.sqrt((1 - pan) / 2) * 1.414
    R[i : i + len(sig)] += sig * np.sqrt((1 + pan) / 2) * 1.414


def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


def lp_fast(x, fc, passes=2):
    # passe-bas via FFT (rapide sur de longs signaux)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / (1 + (f / fc) ** (2 * passes)), len(x))


def hp_fast(x, fc):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X * (f / fc) ** 4 / (1 + (f / fc) ** 4), len(x))


# ---------------------------------------------------------------- harmonie
# Am – F – C – G, une mesure (2 s) par accord à partir du drop
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 55, 60, 64], [55, 59, 62]]
ROOTS = [45, 41, 48, 43]


def chord_at(t):
    if t < DROP:
        return 0
    return int((t - DROP) // 2) % 4


# nappe : scies désaccordées filtrées, attaque lente
pad = np.zeros(N)
tt = np.arange(N) / SR
# k = -1 : l'accord d'ouverture, tenu jusqu'au drop
for k in range(-1, int(DUR // 2) + 2):
    t0 = DROP + 2 * k if k >= 0 else 0
    t1 = DROP + 2 * (k + 1) if k >= 0 else DROP
    c = CHORDS[0] if k < 0 else CHORDS[k % 4]
    if t0 >= DUR:
        break
    i0, i1 = int(t0 * SR), min(N, int((t1 + 0.4) * SR))
    seg = np.zeros(i1 - i0)
    ts = np.arange(i1 - i0) / SR
    for n in c:
        for det in (-0.12, 0.0, 0.11):
            f = note(n + 12) * 2 ** (det / 12)
            seg += 2 * ((ts * f + rng.random()) % 1) - 1
    fade = np.minimum(1, ts / 0.25) * np.minimum(1, np.maximum(0, (t1 + 0.4 - t0 - ts)) / 0.4)
    pad[i0:i1] += seg * fade
pad = lp_fast(pad, 1400) * 0.035
# la nappe s'ouvre depuis le silence, puis se retire à la fin
pad *= np.minimum(1, tt / 3.0)
put(pad, 0, 1.0, -0.15)
put(np.roll(pad, int(0.013 * SR)), 0, 1.0, 0.15)

# ---------------------------------------------------------------- batterie
def kick():
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 42 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 7) + 0.3 * np.sin(ph) * np.exp(-t * 40)


def hat(d=0.05):
    n = int(0.12 * SR)
    return hp_fast(rng.standard_normal(n), 7000) * env(n, 0.001, d)


def clap():
    n = int(0.3 * SR)
    x = rng.standard_normal(n)
    e = np.zeros(n)
    for o in (0, 0.011, 0.022):
        e += env(n, 0.001, 0.012) * (np.arange(n) >= int(o * SR))
    e += 0.6 * env(n, 0.001, 0.09) * (np.arange(n) >= int(0.03 * SR))
    return hp_fast(lp_fast(x, 5000), 700) * e


K, H, C = kick(), hat(), clap()
t = DROP
while t < END_BEAT - 1e-6:
    put(K, t, 0.85)
    if t >= 11:
        put(H, t + BEAT / 2, 0.12, 0.3)
        if t >= 23.5:
            put(hat(0.02), t + BEAT * 0.75, 0.06, -0.3)
    if t >= 16 and int(round((t - DROP) / BEAT)) % 2 == 1:
        put(C, t, 0.28, 0.05)
    t += BEAT

# basse : croches sur la fondamentale, pompage sous le kick
t = DROP
while t < END_BEAT - 1e-6:
    for half in (0, 0.25):
        n = int(0.24 * SR)
        ts = np.arange(n) / SR
        f = note(ROOTS[chord_at(t)] - 12)
        sig = np.sin(2 * np.pi * f * ts) + 0.35 * np.sin(4 * np.pi * f * ts)
        e = np.minimum(1, ts / 0.03) * np.exp(-ts * 6)
        put(sig * e, t + half, 0.30 if half else 0.18)
    t += BEAT

# arpège pincé, 16es, pendant la vue éclatée / projets / blog
t = 23.5
step = 0
while t < 42.5 - 1e-6:
    c = CHORDS[chord_at(t)]
    seq = c + [c[0] + 12]
    n_ = seq[[0, 1, 2, 3, 2, 1, 3, 2][step % 8] % len(seq)] + 12
    n = int(0.35 * SR)
    ts = np.arange(n) / SR
    f = note(n_)
    sig = (np.sin(2 * np.pi * f * ts) + 0.3 * np.sin(6 * np.pi * f * ts)) * env(n, 0.002, 0.11)
    put(sig, t, 0.07, 0.5 if step % 2 else -0.5)
    t += BEAT / 4
    step += 1

# ---------------------------------------------------------------- bruitages
# ouverture : cliquetis de frappe et de chargement
for tc in np.sort(rng.uniform(0.4, 3.5, 44)):
    n = int(0.03 * SR)
    put(hp_fast(rng.standard_normal(n), 3000) * env(n, 0.0005, 0.004), tc, 0.25, rng.uniform(-0.4, 0.4))
# montée avant le drop
n = int(2.2 * SR)
ts = np.arange(n) / SR
sweep = np.sin(2 * np.pi * np.cumsum(180 + 900 * (ts / 2.2) ** 2) / SR)
riser = sweep * (ts / 2.2) ** 2 * 0.12 + hp_fast(rng.standard_normal(n), 2500) * (ts / 2.2) ** 3 * 0.18
put(riser, DROP - 2.2, 1.0)

# impact du drop et des fins
def impact():
    n = int(2.5 * SR)
    t_ = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(30 + 60 * np.exp(-t_ * 6)) / SR) * np.exp(-t_ * 1.6)
    return boom + lp_fast(rng.standard_normal(n), 1200) * np.exp(-t_ * 3) * 0.5


put(impact(), DROP, 0.7)
put(impact(), END_BEAT, 0.8)

# souffles sur chaque coupe (le filet orange qui balaie l'écran)
for tc in CUTS:
    n = int(0.9 * SR)
    ts = np.arange(n) / SR
    shape = np.sin(np.pi * ts / 0.9) ** 3
    w = rng.standard_normal(n)
    w = lp_fast(w, 2400) - lp_fast(w, 500)
    put(w * shape * 0.35, tc - 0.55, 1.0, -0.6)
    put(np.roll(w, 900) * shape * 0.35, tc - 0.5, 1.0, 0.6)

# projets : volets à palettes + tampon
S0, D = 31.5 + 0.2, 0.95
for i in range(6):
    t0 = S0 + i * D
    for k in range(14):
        tc = t0 + k * 0.028
        n = int(0.02 * SR)
        put(hp_fast(rng.standard_normal(n), 2000) * env(n, 0.0003, 0.003), tc, 0.22, -0.3 + k * 0.05)
    n = int(0.3 * SR)
    ts = np.arange(n) / SR
    thud = np.sin(2 * np.pi * 90 * ts) * np.exp(-ts * 25) + lp_fast(rng.standard_normal(n), 1800) * np.exp(-ts * 40) * 0.6
    put(thud, t0 + 0.5, 0.45)
# tampon final
put(thud, 46 + 3.5, 0.6)

# final : accord tenu Fmaj9 -> C qui s'éteint
n = int((DUR - END_BEAT) * SR)
ts = np.arange(n) / SR
outro = np.zeros(n)
for m in (41, 48, 52, 55, 60, 64, 67):
    f = note(m)
    outro += np.sin(2 * np.pi * f * ts + rng.random() * 6) + 0.2 * np.sin(4 * np.pi * f * ts)
outro *= np.minimum(1, ts / 0.08) * np.exp(-ts / 2.8) * 0.05
put(outro, END_BEAT, 1.0)

# ---------------------------------------------------------------- réverbe & master
ir_n = int(2.2 * SR)
ir_t = np.arange(ir_n) / SR
for ch in (0, 1):
    ir = rng.standard_normal(ir_n) * np.exp(-ir_t * 3.2)
    ir = lp_fast(ir, 4000)
    ir /= np.sqrt((ir**2).sum())
    x = L if ch == 0 else R
    m = N + ir_n
    wet = np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[:N]
    x += wet * 0.22
mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.4) / np.tanh(1.4)
# fondu final aligné sur le noir de la vidéo
fade = np.ones(N)
fs = int((DUR - 1.2) * SR)
fade[fs:] = np.linspace(1, 0, N - fs) ** 1.5
fade[: int(0.05 * SR)] = np.linspace(0, 1, int(0.05 * SR))
mix *= fade[:, None]
mix /= np.abs(mix).max() / 0.89
out = (mix * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(out.tobytes())
print('bande-son :', sys.argv[1], f'{DUR:.1f} s')
