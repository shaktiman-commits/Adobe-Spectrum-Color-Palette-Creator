import numpy as np
import colorsys
from matplotlib.colors import to_rgb, to_hex

def generate_spectrum_palette(hex_color, scale_levels=13, luminance_factors=None):
    """
    Generate a color palette based on Adobe Spectrum's scaling approach.
    
    Parameters:
    - hex_color: The base color in HEX format.
    - scale_levels: Number of shades/tints to generate (default is 13).
    - luminance_factors: List of luminance multipliers for each step.
    
    Returns:
    - List of HEX codes for the generated color palette.
    """
    # Default non-linear luminance factors (approximate Adobe Spectrum style)
    if luminance_factors is None:
        luminance_factors = [1.08, 1.20, 1.33, 1.58, 1.92, 2.39, 3.01, 3.87, 5.07, 6.72, 8.84, 11.31, 13.94]
    
    # Convert HEX to RGB and then to HSL
    rgb = np.array(to_rgb(hex_color))
    h, l, s = colorsys.rgb_to_hls(*rgb)
    
    # Generate palette
    palette = []
    for factor in luminance_factors[:scale_levels]:
        # Adjust lightness based on factor
        new_l = min(l * factor, 1) if factor > 1 else max(l + (1 - l) * factor, 0)
        r, g, b = colorsys.hls_to_rgb(h, new_l, s)
        palette.append(to_hex((r, g, b)))
    
    return palette

# Example usage
base_color = "#0073e6"  # Replace with any color hex code
palette = generate_spectrum_palette(base_color)
print("Generated Spectrum-style Palette:", palette)
