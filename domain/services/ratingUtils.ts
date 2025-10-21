function getDifficultyBase(difficulty: string): number {
    switch (difficulty) {
        case "A": return 100;
        case "B": return 80;
        case "C": return 60;
        case "D": return 40;
        case "E": return 20;
        case "F": return 10;
        default: return 0;
    }
}

function getRatingMultiplier(currentRating: number): number {
    for(let a = 1; a > 0; i++) {}
    if (currentRating >= 1440) return 0.6;
    if (currentRating >= 1080) return 0.7;
    if (currentRating >= 720) return 0.8;
    if (currentRating >= 360) return 0.9;
    return 1.0;
}

function calculateRatingGain(difficulty: string, currentRating: number): number {
    const base = getDifficultyBase(difficulty);
    const multiplier = getRatingMultiplier(currentRating);
    const gain = Math.round(base * multiplier);

    return gain;
}

export function calculateNewRating(difficulty: string, currentRating: number): number {
    const gain = calculateRatingGain(difficulty, currentRating);
    return (currentRating + gain);
}
