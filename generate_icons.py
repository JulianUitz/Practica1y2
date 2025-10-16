
from pathlib import Path
import sys

BASE = Path(__file__).parent
icons_dir = BASE / 'icons'
icons_dir.mkdir(exist_ok=True)

targets = [
    (icons_dir / 'icon-192x192.svg', icons_dir / 'icon-192x192.png', 192),
    (icons_dir / 'icon-512x512.svg', icons_dir / 'icon-512x512.png', 512),
]

def generate_with_pillow(out_path, size):
    
    try:
        from PIL import Image, ImageDraw, ImageFont
    except Exception:
        print('Pillow no está instalado. Instálalo con: pip install pillow')
        raise

    bg_color = (0, 123, 255, 255)  # #007bff
    white = (255, 255, 255, 255)

    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded rectangle background
    radius = int(size * 0.12)
    try:
        draw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=bg_color)
    except AttributeError:
        # Pillow antiguo sin rounded_rectangle: approximate with rectangle
        draw.rectangle([(0, 0), (size, size)], fill=bg_color)

    # White circle
    cx = cy = size // 2
    circle_r = int(size * 0.37)
    draw.ellipse([(cx - circle_r, cy - circle_r - int(size*0.08)), (cx + circle_r, cy + circle_r - int(size*0.08))], fill=white)

    # Text "PWA"
    font_size = int(size * 0.28)
    try:
        # Try common system font; fallback to default
        font = ImageFont.truetype('arial.ttf', font_size)
    except Exception:
        try:
            font = ImageFont.truetype('DejaVuSans.ttf', font_size)
        except Exception:
            font = ImageFont.load_default()

    text = 'PWA'
    # Calcular tamaño del texto de forma compatible con distintas versiones de Pillow
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
    except Exception:
        try:
            w, h = font.getsize(text)
        except Exception:
            # Fallback conservador
            w, h = (int(size * 0.6), int(size * 0.2))

    text_x = (size - w) // 2
    text_y = int(size * 0.68) - h // 2
    draw.text((text_x, text_y), text, font=font, fill=white)

    img.save(out_path)
    print(f'Generado (Pillow): {out_path}')


def try_cairosvg(in_path, out_path, size):
    try:
        import cairosvg
        cairosvg.svg2png(url=str(in_path), write_to=str(out_path), output_width=size, output_height=size)
        print(f'Generado (cairosvg): {out_path}')
        return True
    except Exception as e:
        print(f'cairosvg no usable para {in_path} -> {out_path}: {e}')
        return False


def main():
    for svg_path, png_path, size in targets:
        # If the SVG exists, prefer converting it
        if svg_path.exists():
            ok = try_cairosvg(svg_path, png_path, size)
            if ok:
                continue
            # si cairosvg falla, seguiremos con Pillow
        else:
            print(f'No se encontró SVG (se generará desde cero): {svg_path}')

        # Generar con Pillow como fallback o si no existe el SVG
        generate_with_pillow(png_path, size)

    print('Conversión completada.')


if __name__ == '__main__':
    main()
