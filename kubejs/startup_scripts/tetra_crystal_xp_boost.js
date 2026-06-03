const $BreakSpeedEvent = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$BreakSpeed')
const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $PhantasmConfig = Java.loadClass('net.lyof.phantasm.config.ConfigEntries')

const CRYSTAL_TETRA_TOOL_ITEMS = [
  'tetra:modular_double',
  'tetra:modular_single',
  'tetra:modular_sword'
]

NativeEvents.onEvent($BreakSpeedEvent, event => {
  const player = event.getEntity()
  const stack = player.getMainHandItem()
  const item = stack.getItem()

  if (stack.isEmpty() || !isCrystalTetraTool(stack, item) || !item.isCorrectToolForDrops(stack, event.getState())) {
    return
  }

  // This formula is from the End's Phantasm source code
  const multiplier = 1 + $PhantasmConfig.crystalXPBoost * player.experienceLevel / 50
  event.setNewSpeed(event.getNewSpeed() * multiplier)
})

function isCrystalTetraTool(stack, item) {
  if (!CRYSTAL_TETRA_TOOL_ITEMS.includes(String($BuiltInRegistries.ITEM.getKey(item)))) {
    return false
  }

  const modules = item.getMajorModules(stack)
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i]
    const variant = module.getVariantData(stack)
    if (variant && variant.key && String(variant.key).endsWith('/crystal')) {
      return true
    }
  }
  return false
}
