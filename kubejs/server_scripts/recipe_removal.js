ServerEvents.recipes(event => {
  // Remove sulfur ore recipe because sulfur ore is disabled
  event.remove({id: 'create_mf:sulfurfromorerecipe'})
})
