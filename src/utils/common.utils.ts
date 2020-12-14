export function saveLocation(latitude, longitude) {
    localStorage.setItem("location", JSON.stringify({ latitude, longitude }));
}

export function getLocation() {
    try {
        const { latitude, longitude } = JSON.parse(localStorage.getItem("location"));
        return { latitude, longitude };
    } catch (error) {

    }
    return { latitude: null, longitude: null };
}