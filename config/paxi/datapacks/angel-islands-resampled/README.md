# Angel Islands Resampled

This datapack overrides only the three Angel Islands density functions that sample
the island mask noise:

- `angel_islands:islands/layer1/noise`
- `angel_islands:islands/layer2/noise`
- `angel_islands:islands/layer3/noise`

Minecraft does not expose a separate seed for a single density-function noise.
Instead, this pack applies a large coordinate offset to the island mask sampling.
That makes Angel Islands behave like it is using a different island layout while
the actual world seed, ground terrain, biomes, caves, and structures remain tied
to the original seed.

The offsets preserve the mod's original spacing between the three island layers,
but move the whole island pattern by `+5000` blocks on X and `-5700` blocks on Z.
If you want to try another island layout, change those base offsets in the three
`noise.json` files while keeping the layer-to-layer difference of `4000` blocks.
