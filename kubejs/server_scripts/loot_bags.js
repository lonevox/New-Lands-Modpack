const $DustParticleOptions = Java.loadClass('net.minecraft.core.particles.DustParticleOptions')
const $LootContextParams = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParams')
const $LootContextParamSets = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParamSets')
const $LootParamsBuilder = Java.loadClass('net.minecraft.world.level.storage.loot.LootParams$Builder')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')
const $SoundSource = Java.loadClass('net.minecraft.sounds.SoundSource')
const $Vector3f = Java.loadClass('org.joml.Vector3f')

const LOOT_BAGS = {
  common: {
    loot: [
      ['minecraft:bread', 3],
      ['minecraft:torch', 8],
      ['minecraft:apple', 2]
    ],
    firework: { color: 0x8B5A2B, size: 0.45, particles: 18, scale: 0.85 }
  },
  uncommon: {
    loot: [
      ['minecraft:iron_ingot', 4],
      ['minecraft:golden_carrot', 2],
      ['minecraft:experience_bottle', 3]
    ],
    firework: { color: 0xFFFF33, size: 0.6, particles: 26, scale: 1.0 }
  },
  rare: {
    loot: [
      ['minecraft:diamond', 1],
      ['minecraft:ender_pearl', 4],
      ['minecraft:lapis_lazuli', 16]
    ],
    firework: { color: 0x00B7B7, size: 0.8, particles: 38, scale: 1.15 }
  },
  epic: {
    loot: [
      ['minecraft:emerald', 6],
      ['minecraft:golden_apple', 1],
      ['minecraft:blaze_rod', 4]
    ],
    firework: { color: 0xFF66CC, size: 1.05, particles: 52, scale: 1.3 }
  },
  legendary: {
    loot: [
      ['minecraft:netherite_scrap', 1],
      ['minecraft:diamond', 8],
      ['minecraft:enchanted_golden_apple', 1]
    ],
    firework: { color: 0xFFFFFF, size: 1.3, particles: 72, scale: 1.5 }
  }
}

LootJS.lootTables(event => {
  Object.entries(LOOT_BAGS).forEach(([rarity, config]) => {
    event.create(`kubejs:loot_bags/${rarity}`, LootType.CHEST).createPool(pool => {
      pool.name(`${rarity}_loot_bag_placeholder`)
      pool.rolls(1)

      config.loot.forEach(([itemId, count]) => {
        pool.addEntry(Item.of(itemId, count))
      })
    })
  })
})

Object.keys(LOOT_BAGS).forEach(rarity => {
  ItemEvents.rightClicked(`kubejs:${rarity}_loot_bag`, event => {
    const { player, hand, item, level } = event

    if (level.isClientSide()) {
      return
    }

    if (!player.isCreative()) {
      item.shrink(1)
    }

    console.log(`Player ${player.getName().getString()} opened a ${rarity} loot bag!`)
    throwLootFromPlayer(player.server, level, player, `kubejs:loot_bags/${rarity}`)
    spawnLootBagFirework(level, player, LOOT_BAGS[rarity].firework)
    player.playNotifySound($SoundEvents.EXPERIENCE_ORB_PICKUP, $SoundSource.PLAYERS, 0.8, 1.2)
    level.playSound(player, player.blockPosition(), $SoundEvents.EXPERIENCE_ORB_PICKUP, $SoundSource.PLAYERS, 0.8, 1.2)

    player.swing(hand, true)
    event.cancel()
  })
})

function throwLootFromPlayer(server, level, player, tableId) {
  const lootKey = $ResourceKey.create($Registries.LOOT_TABLE, tableId)
  const lootTable = server.reloadableRegistries().getLootTable(lootKey)
  const lootParams = new $LootParamsBuilder(level)
    .withParameter($LootContextParams.ORIGIN, player.position())
    .withOptionalParameter($LootContextParams.THIS_ENTITY, player)
    .withLuck(player.getLuck())
    .create($LootContextParamSets.CHEST)

  lootTable.getRandomItems(lootParams).forEach(stack => {
    if (!stack.isEmpty()) {
      player.drop(stack, false, true)
    }
  })
}

function spawnLootBagFirework(level, player, config) {
  const x = player.getX()
  const y = player.getY() + 1.0
  const z = player.getZ()
  const dust = new $DustParticleOptions(colorVector(config.color), config.scale)

  level.sendParticles($ParticleTypes.FLASH, x, y, z, 1, 0, 0, 0, 0)
  level.sendParticles($ParticleTypes.FIREWORK, x, y, z, Math.floor(config.particles / 3), config.size, config.size, config.size, 0.18)
  level.sendParticles(dust, x, y, z, config.particles, config.size, config.size, config.size, 0.04)
}

function colorVector(color) {
  const vector = new $Vector3f()
  vector.x = ((color >> 16) & 255) / 255
  vector.y = ((color >> 8) & 255) / 255
  vector.z = (color & 255) / 255
  return vector
}
