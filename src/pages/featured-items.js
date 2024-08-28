export const prerender = false;

export async function getFeaturedItems() {
    const headers = {
        'Authorization': `Bearer ${import.meta.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }

    const categoryList = await fetch("https://connect.squareup.com/v2/catalog/list?types=CATEGORY", {
        headers
    });
    const categories = await categoryList.json();
    const featured = categories?.objects.find((cat) => cat?.["category_data"]?.name.includes("Featured"));

    let items = null;
    if (featured) {
        const searchItems = await fetch("https://connect.squareup.com/v2/catalog/search-catalog-items", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({'category_ids': [featured.id]})
        });
        const search = await searchItems.json();
        items = search?.items;
    }

    return items;
}