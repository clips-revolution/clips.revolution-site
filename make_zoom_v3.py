"""Generate the v3 favicon set: same artwork, zoomed tighter in the circle.

v2 cropped at radius 240 around the image centre, leaving the R at ~76% of the
disc height. The glyph sits 16px above centre, so re-centring the crop on the
glyph itself buys back room. The limit is the hammer (top) and the boots
(bottom): the furthest lit pixel is 208.4px from the glyph centre, so the crop
radius is set to keep that point at 95% of the circle radius -- tight, but with
enough margin that antialiasing never touches the edge.
"""

from PIL import Image, ImageDraw

SRC = 'favicon-512.png'
GLYPH_CENTRE = (257, 240)   # bbox centre of the lit pixels in SRC
MAX_GLYPH_RADIUS = 208.4    # furthest lit pixel from GLYPH_CENTRE
EDGE_MARGIN = 0.95          # furthest pixel lands at 95% of the circle radius

img = Image.open(SRC).convert('RGBA')

radius = MAX_GLYPH_RADIUS / EDGE_MARGIN
cx, cy = GLYPH_CENTRE

# The crop is re-centred on the glyph, so verify the output circle still lands
# entirely inside the purple disc (centre 256,256, radius 256) -- otherwise the
# edges would come out transparent.
offset = ((cx - 256) ** 2 + (cy - 256) ** 2) ** 0.5
assert radius + offset <= 256, 'crop would fall outside the purple disc'

box = (cx - radius, cy - radius, cx + radius, cy + radius)
zoomed = img.crop(tuple(round(v) for v in box)).resize((512, 512), Image.LANCZOS)

mask = Image.new('L', (512, 512), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 512, 512), fill=255)

final = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
final.paste(zoomed, (0, 0), mask=mask)

for size in (32, 48, 192, 512):
    final.resize((size, size), Image.LANCZOS).save(f'favicon-{size}-v3.png')
final.save('favicon-v3.ico', format='ICO', sizes=[(256, 256)])
final.save('favicon.ico', format='ICO', sizes=[(256, 256)])  # root fallback

print(f'v3 generated (crop radius {radius:.1f}).')
