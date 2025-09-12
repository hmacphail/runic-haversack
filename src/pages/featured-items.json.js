export async function getFeaturedItems() {
    try {
        // Check if the access token is available
        if (!import.meta.env.SQUARE_ACCESS_TOKEN) {
            return new Response(JSON.stringify({ error: 'Missing API token' }), {
                status: 500,
                statusText: 'Configuration Error',
                headers: { "Content-Type": "application/json" }
            });
        }

        const headers = {
            'Authorization': `Bearer ${import.meta.env.SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }

        // Fetch categories
        const categoryList = await fetch("https://connect.squareup.com/v2/catalog/list?types=CATEGORY", {
            headers
        });
        
        if (!categoryList.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
                status: categoryList.status,
                statusText: categoryList.statusText,
                headers: { "Content-Type": "application/json" }
            });
        }

        const categories = await categoryList.json();
        const featured = categories?.objects?.find((cat) => cat?.["category_data"]?.name.includes("Featured"));

        if (!featured) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Search for items in the featured category
        const searchItems = await fetch("https://connect.squareup.com/v2/catalog/search-catalog-items", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({'category_ids': [featured.id]})
        });

        if (!searchItems.ok) {
            return new Response(JSON.stringify({ error: 'Failed to search items' }), {
                status: searchItems.status,
                statusText: searchItems.statusText,
                headers: { "Content-Type": "application/json" }
            });
        }

        const search = await searchItems.json();
        let items = search?.items || [];

        // Process and sort items
        items = items.map((item) => {
            const itemInCategory = item.item_data.categories.find(c => c.id === featured.id);
            return { ...item, featured_category: { ...itemInCategory }};
        }).sort((a, b) => a.featured_category.ordinal - b.featured_category.ordinal);

        return new Response(
            JSON.stringify(items), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { "Content-Type": "application/json" }
        });
    }
}