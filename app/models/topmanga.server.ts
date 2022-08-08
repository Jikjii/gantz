export async function getTopMangas() {
    const res = await fetch(
        'https://kitsu.io/api/edge/trending/manga'
    ).then((res) => res.json())

    // return res.data
    return res.data
}