ItemEvents.modifyTooltips(event => {
	event.modify('selfexpression:cave_game_hoodie_chestplate', tooltip => {
    tooltip.insert(2, ['', Text.of("Best 40 bucks I've ever spent – q").gray().italic()])
	})
})
