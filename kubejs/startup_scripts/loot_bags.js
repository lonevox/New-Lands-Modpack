const $Rarity = Java.loadClass('net.minecraft.world.item.Rarity')

StartupEvents.registry('item', event => {
  const LOOT_BAG_RARITIES = [
    ['common', $Rarity.COMMON],
    ['uncommon', $Rarity.UNCOMMON],
    ['rare', $Rarity.RARE],
    ['epic', $Rarity.EPIC],
    ['legendary', $Rarity.EPIC]
  ]
  
  LOOT_BAG_RARITIES.forEach(([rarity, itemRarity]) => {
    event.create(`${rarity}_loot_bag`)
      .displayName(`${rarity.charAt(0).toUpperCase()}${rarity.slice(1)} Loot Bag`)
      .texture(`kubejs:item/loot_bags/${rarity}`)
      .rarity(itemRarity)
      .maxStackSize(64)
  })
})
