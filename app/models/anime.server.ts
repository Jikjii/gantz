
export async function getAnimes() {
    const res = await fetch(
        `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0`
    ).then((res) => res.json())
    console.log(res)
    return res.data
}