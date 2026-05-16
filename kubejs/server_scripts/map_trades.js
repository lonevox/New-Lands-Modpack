const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const TagKey = Java.loadClass('net.minecraft.tags.TagKey')

// Remove cartographer treasure map trades to avoid server deadlocks when the server inevitably can't find the structure
// it's trying to generate a map for, as most of the world is ocean, so some structures will never spawn.
// After removal, add tresure map trades that won't fail.

ServerEvents.tags('worldgen/structure', event => {
  event.add('kubejs:village_ocean_maps', 'joshie:village_ocean')
  event.add('kubejs:victory_frigate_maps', 'dungeons_arise_seven_seas:victory_frigate')
})

MoreJS.villagerTrades(event => {
  event.removeTrades({
    professions: ['cartographer'],
    types: ['treasuremapforemeralds']
  })

  event.addTrade('cartographer', 2, createExplorerMapTrade(8, "minecraft:shipwreck", 'Shipwreck Explorer Map'))
  event.addTrade('cartographer', 3, createExplorerMapTrade(13, "minecraft:on_ocean_explorer_maps", 'Ocean Monument Explorer Map'))
  event.addTrade('cartographer', 3, createExplorerMapTrade(12, structureTag('kubejs:village_ocean_maps'), 'Ocean Village Explorer Map'))
  event.addTrade('cartographer', 5, createExplorerMapTrade(14, structureTag('kubejs:victory_frigate_maps'), 'Victory Frigate Explorer Map'))
})

const STRUCTURE_REGISTRY = ResourceKey.createRegistryKey(ResourceLocation.parse('minecraft:worldgen/structure'))
function structureTag(tag) {
  return TagKey.create(STRUCTURE_REGISTRY, ResourceLocation.parse(tag))
}

function createExplorerMapTrade(emeraldCount, structureTag, displayName, range) {
  return VillagerUtils
    .createCustomMapTrade(
      [Item.of('minecraft:emerald', emeraldCount), Item.of('minecraft:compass')],
      (level, entity) => level.findNearestMapStructure(
        structureTag,
        entity.blockPosition(),
        3000,
        false
      )
    )
    .displayName(displayName)
}
