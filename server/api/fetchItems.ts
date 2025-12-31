import { RssItem } from "~~/utils/types";

import Parser from 'rss-parser';

let parser = new Parser();

async function fetchFeed(url: string): Promise<RssItem[]> {
    if (url.trim().length === 0) {
        return [];
    };

    const feed: { [key: string]: any; } = await parser.parseURL(url);

    return feed.items;
};

export default defineEventHandler(async (event) => {
    const method: string = event.method;

    if (method !== "GET") {
        setResponseStatus(event, 418);

        return {
            error: "That method is not allowed"
        };
    };

    if (method === "GET") {
        const query = getQuery(event);

        const url: string|undefined = query.url?.toString();

        if (!url || url.trim().length === 0) {
            setResponseStatus(event, 400);
            
            return {
                "error": "That is not a valid url"
            };
        };

        const items: RssItem[] = await fetchFeed(url);
    
        setResponseStatus(event, 200);
        
        return {
            items: items
        };
    };
});