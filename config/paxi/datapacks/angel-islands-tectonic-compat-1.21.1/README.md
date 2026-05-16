# Angel Islands + Tectonic compatibility (Minecraft 1.21.1) v0.2

Targeted for:
- Angel Islands 2.0.3
- Tectonic 3.0.22
- Minecraft 1.21.1

This version keeps Tectonic terrain as the base terrain and adds Angel Islands on top,
but changes the biome-routing fix to use Angel's actual island density as the selector.

Key idea:
- Outside the Angel island mask: keep Tectonic biome inputs.
- Inside the Angel island mask: use Angel-style biome inputs so island terrain is not forced to inherit ocean biomes.

Files overridden in the minecraft namespace:
- worldgen/density_function/overworld/noise_router/final_density.json
- worldgen/density_function/overworld/noise_router/continents.json
- worldgen/density_function/overworld/noise_router/ridges.json
- worldgen/density_function/overworld/noise_router/erosion.json
- worldgen/density_function/overworld/noise_router/temperature.json
- worldgen/density_function/overworld/noise_router/vegetation.json
- worldgen/density_function/overworld/noise_router/depth.json

Notes:
- This was built from the public source definitions for Angel Islands and Tectonic.
- It has not been tested in-game in this environment.
- Generate new chunks when testing; existing chunks keep their old biome data.
