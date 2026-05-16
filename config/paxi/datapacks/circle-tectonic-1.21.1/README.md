# Circle Tectonic 1.21.1 / Tectonic 3.0.22 test build

This datapack is intended to be loaded after Tectonic and requires More Density Functions.

## What this version changes

Earlier builds masked `tectonic:noise/full_continents`. In Tectonic 3.x, that is enough to affect biome placement, but terrain-height splines also read `tectonic:noise/raw_continents` directly. That produced the bad result where outer land generated with ocean biomes.

This version also overrides:

`data/tectonic/worldgen/density_function/noise/raw_continents.json`

and keeps a local unmasked copy at:

`data/circletectonic/worldgen/density_function/noise_raw_continents_base.json`

That should make both biome placement and Tectonic terrain shaping see the same circular falloff.

## Main tuning files

- `data/circletectonic/worldgen/density_function/configurable/unaffected_radius.json`
- `data/circletectonic/worldgen/density_function/configurable/falloff_radius.json`
- `data/circletectonic/worldgen/density_function/configurable/offset_x.json`
- `data/circletectonic/worldgen/density_function/configurable/offset_z.json`
- `data/circletectonic/worldgen/density_function/configurable/keep_mushroom_islands.json`

Default radius values are inherited from the previous build.

## Notes

Test on a new world or newly generated chunks. Old chunks will not change.
