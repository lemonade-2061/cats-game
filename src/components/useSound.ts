export const useSound = (url: string, globalVolume: number) => {
    const play = (v?: number) => {
        const audio = new Audio(url);
        const finalVolume = (v !== undefined ? v : globalVolume);
        audio.volume = finalVolume / 10;
        audio.currentTime = 0;
        audio.play().catch(() => {});
    };
    return { play };
};

export const useRandomSound = (urls: string[], volume: number) => {
    const play = (v?: number) => {
        const randomIndex = Math.floor(Math.random() * urls.length);
        const audio = new Audio(urls[randomIndex]);
        audio.volume = (v !== undefined ? v : volume) / 10;
        audio.currentTime = 0;
        audio.play().catch(() => {});
    };

    return { play };
};