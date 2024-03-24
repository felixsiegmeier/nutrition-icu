function getPalData(pal){
	const defaultData = {
		energy: 22,
		carbs: 2.8,
		protein: 1,
		fat: 0.8
	};

	const energyRequirement = defaultData.energy * pal

	const newData = {...defaultData}

	while (newData.energy < energyRequirement){
		if(newData.carbs < 4){
			newData.carbs += 0.1
			newData.energy += 0.4
			continue
		}
		if(newData.fat < (newData.protein-0.1)){
			newData.fat += 0.1
			newData.energy += 0.9
			continue
		}
		if(newData.protein < 1.3){
			newData.protein += 0.1
			newData.energy += 0.4
			continue
		}
		if(newData.carbs < 4.5){
			newData.carbs += 0.1
			newData.energy += 0.4
			continue
		}
		if(newData.fat < (newData.protein-0.1)){
			newData.fat += 0.1
			newData.energy += 0.9
			continue
		}
		if(newData.protein < 1.5){
			newData.protein += 0.1
			newData.energy += 0.4
			continue
		}
		if(newData.carbs < 5){
			newData.carbs += 0.1
			newData.energy += 0.4
			continue
		}
		if(newData.fat < 1.5){
			newData.fat += 0.1
			newData.energy += 0.9
			continue
		}
		if(newData.protein < 1.6){
			newData.protein += 0.1
			newData.energy += 0.4
			continue
		}
		newData.carbs += 0.1
		newData.energy += 0.4
	}
	return JSON.stringify(newData)
}