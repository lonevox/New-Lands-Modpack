BlockEvents.rightClicked('plushie_buddies:plushie_peter', event => {
  const { player, hand, level, block } = event

  level.playSound(null, block.pos, 'kubejs:plushie_peter', 'blocks')
  player.swing(hand, true)
  event.cancel()
})
