export function getCalcWeight({weight, height, calcMode, gender}) {
    const heightInMeters = height / 100; // Konvertiere cm in Meter
    // Neue Formel für IBW
    const ibw = 2.2 * 25 + 3.5 * 25 * (heightInMeters - 1.5);

    // Berechnung des BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    // Berechnung von ABW basierend auf BMI
    let abw;
    if (bmi < 30) {
        abw = weight; // RBW für BMI unter 30
    } else if (bmi >= 30 && bmi < 40) {
        abw = ibw; // IBW für BMI zwischen 30 und 40
    } else {
        abw = (weight - ibw) * 0.33 + ibw; // Anpassung für BMI über 40
    }

    let corrWeight = weight; // Standardmäßig das reale Gewicht

    switch (parseInt(calcMode)) {
        case 1: // IBW
            corrWeight = ibw;
            break;
        case 2: // ABW
            corrWeight = abw;
            break;
        case 3: // RBW
            // Bereits auf das reale Gewicht gesetzt
            break;
        default:
            // Falls ein unbekannter calcMode übergeben wird
            console.error("Unbekannter calcMode");
            console.error(calcMode)
            break;
    }

    return Math.round(corrWeight);
}


export function getPalData(pal) {
    // Grundlegende Validierung von 'pal'
    if (typeof pal !== 'number' || pal <= 0) {
        throw new Error('Invalid PAL value. PAL must be a positive number.');
    }

    const defaultData = {
        energy: 22,
        carbs: 2.8,
        protein: 1,
        fat: 0.8
    };

    const energyRequirement = defaultData.energy * pal;

    const newData = {...defaultData};

    // Funktion zur inkrementellen Anpassung der Nährstoffe, um die Lesbarkeit und Wartbarkeit zu verbessern
    function adjustNutrients() {
        if (newData.carbs < 4 && newData.energy < energyRequirement) {
            newData.carbs += 0.1;
            newData.energy += 0.4;
        } else if (newData.fat < Math.min(newData.protein - 0.1, 1.5) && newData.energy < energyRequirement) {
            newData.fat += 0.1;
            newData.energy += 0.9;
        } else if (newData.protein < 1.3 && newData.energy < energyRequirement) {
            newData.protein += 0.1;
            newData.energy += 0.4;
        }else if (newData.carbs < 4.5 && newData.energy < energyRequirement) {
            newData.carbs += 0.1;
            newData.energy += 0.4;
        } else if (newData.fat < Math.min(newData.protein - 0.1, 1.5) && newData.energy < energyRequirement) {
            newData.fat += 0.1;
            newData.energy += 0.9;
        } else if (newData.protein < 1.6 && newData.energy < energyRequirement) {
            newData.protein += 0.1;
            newData.energy += 0.4;
        } else if (newData.carbs < 5 && newData.energy < energyRequirement) {
            newData.carbs += 0.1;
            newData.energy += 0.4;
        } else if (newData.energy < energyRequirement) {
            // Generischer Ansatz zur weiteren Erhöhung der Energie, falls spezifische Bedingungen bereits erfüllt sind
            newData.carbs += 0.1;
            newData.energy += 0.4;
        }
    }

    // Schleife zur Anpassung der Nährstoffe basierend auf dem Energiebedarf
    while (newData.energy < energyRequirement) {
        adjustNutrients();
    }

    // Rundung der Nährstoffwerte
    newData.energy = Math.round(newData.energy);
    newData.carbs = Math.round(newData.carbs * 10) / 10;
    newData.protein = Math.round(newData.protein * 10) / 10;
    newData.fat = Math.round(newData.fat * 10) / 10;

    return newData;
}