import numpy as np
import colorsys
from matplotlib.colors import to_rgb, to_hex

def generate_spectrum_palette(base_hex_color, levels=None):
    """
    Generates an Adobe Spectrum-style color palette with the input color as level 700.

    Parameters:
    - base_hex_color: The base color in HEX format (e.g., '#002B82'), which will be set at level 700.
    - levels: A list of levels to generate in the palette (default is [100, 200, ..., 1300]).

    Returns:
    - A dictionary with levels as keys and HEX color codes as values.
    """
    if levels is None:
        levels = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300]
    
    # Luminance adjustment factors relative to the base color at level 700
    luminance_factors = {
        100: 1.80,
        200: 1.60,
        300: 1.40,
        400: 1.20,
        500: 1.10,
        600: 1.05,
        700: 1.00,   # Base color
        800: 0.90,
        900: 0.80,
        1000: 0.70,
        1100: 0.60,
        1200: 0.50,
        1300: 0.40,
    }

    # Convert base color to HSL
    rgb = np.array(to_rgb(base_hex_color))
    h, l, s = colorsys.rgb_to_hls(*rgb)
    
    palette = {}

    for level in levels:
        factor = luminance_factors.get(level, 1.0)
        # Adjust luminance
        if factor >= 1.0:
            new_l = l + (1.0 - l) * (factor - 1.0) / factor
        else:
            new_l = l * factor
        # Ensure new_l is within [0,1]
        new_l = min(max(new_l, 0), 1)
        # Convert back to RGB
        r, g, b = colorsys.hls_to_rgb(h, new_l, s)
        hex_color = to_hex((r, g, b))
        palette[level] = hex_color.upper()

    return palette

# Example usage with base color '#002B82'
if __name__ == "__main__":
    base_color = "#002B82"
    palette = generate_spectrum_palette(base_color)

    # Display the palette
    for level in sorted(palette.keys()):
        print(f"Level {level}: {palette[level]}")
