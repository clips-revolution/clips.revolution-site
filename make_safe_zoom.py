from PIL import Image, ImageDraw

img = Image.open('favicon-512.png').convert('RGBA')

# To perfectly fit the R without cutting the hammer or the feet in a CIRCLE:
# Center is (256, 256)
# The R's hammer reaches y=55 (201px from center).
# The furthest point from center is 235px.
# We will use a safe radius of 240px.
radius = 240
box = (256 - radius, 256 - radius, 256 + radius, 256 + radius)
cropped = img.crop(box)

zoomed = cropped.resize((512, 512), Image.LANCZOS)

mask = Image.new('L', (512, 512), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, 512, 512), fill=255)

final = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
final.paste(zoomed, (0, 0), mask=mask)

final.save('favicon-zoomed-safe.png')

# Now overwrite the v2 files for production
sizes = [32, 48, 192, 512]
for size in sizes:
    final.resize((size, size), Image.LANCZOS).save(f'favicon-{size}-v2.png')

final.save('favicon-v2.ico', format='ICO', sizes=[(256,256)])
print('Generated safe zoomed v2 favicons.')
