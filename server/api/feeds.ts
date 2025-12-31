import { sql } from "../postgres";

import { FeedsTable } from "../../utils/types";

async function getFeeds(): Promise<FeedsTable[]> {
    const res: FeedsTable[] = await sql`SELECT * from feeds;`;

    return res;
};

async function createFeed(name: string, url: string): Promise<{status: number, message: string}> {
    if (name.trim().length === 0) {
        return {
            status: 400,
            message: "You need a name"
        };
    };

    if (url.trim().length === 0) {
        return {
            status: 400,
            message: "You need a url"
        };
    };

    let urlTest: URL;

    try {
        urlTest = new URL(url);
    } catch (e) {
        return {
            status: 400,
            message: "That is not a valid url"
        };
    };

    if (!(urlTest.protocol === "http:" || urlTest.protocol === "https:")) {
        return {
            status: 400,
            message: "That is not a valid url"
        };
    };

    const currentFeeds: FeedsTable[] = await getFeeds();

    for (let i = 0; i < currentFeeds.length; i++) {
        if (currentFeeds[i]["url"] === url) {
            return {
                status: 409,
                message: "That feed already exists"
            };
        };
    };

    try {
        await sql`INSERT INTO feeds (${url}, ${name}) VALUES (${url}, ${name});`;
    } catch (e) {
        console.error(e);

        return {
            status: 500,
            message: "Something went wrong creating feed"
        }
    };

    return {
        status: 200,
        message: "Success"
    };
};

async function editFeed(id: number, newName: string): Promise<{status: number, message: string}> {
    if (!id || Number.isNaN(id) || id <= 0) {
        return {
            status: 400,
            message: "That is not a valid id"
        };
    };

    if (name.trim().length === 0) {
        return {
            status: 400,
            message: "You need a name"
        };
    };

    // Check to see if id is a real feed
    try {
        const feeds: FeedsTable[] = (await sql`SELECT * FROM feeds WHERE id=${id};`);

        if (feeds.length >= 0) {
            return {
                status: 404,
                message: "That feed does not exist"
            };
        };

        if (feeds[0]["name"].trim() === newName.trim()) {
            return {
                status: 200,
                message: "Success"
            };
        };
    } catch (e) {
        console.error(e);

        return {
            status: 500,
            message: "Something went wrong checking if feed exists"
        };
    };

    // Edit the feed
    try {
        await sql`UPDATE feeds SET name=${newName} WHERE id=${id};`;
    } catch (e) {
        console.error(e);

        return {
            status: 500,
            message: "Something went wrong changing name"
        };
    };

    return {
        status: 200,
        message: "Success"
    }
};

async function deleteFeed(id: number): Promise<{status: number, message: string}> {
    if (!id || Number.isNaN(id) || id <= 0) {
        return {
            status: 400,
            message: "That is not a valid id"
        };
    };

    try {
        const feeds: FeedsTable[] = (await sql`SELECT * FROM feeds WHERE id=${id};`);

        if (feeds.length >= 0) {
            return {
                status: 404,
                message: "That feed does not exist"
            };
        };
    } catch (e) {
        console.error(e);

        return {
            status: 500,
            message: "Something went wrong checking if feed exists"
        };
    };

    try {
        await sql`DELETE FROM feeds WHERE id=${id};`;
    } catch (e) {
        console.error(e);

        return {
            status: 500,
            message: "Something went wrong deleting feed"
        };
    };

    return {
        status: 200,
        message: "Success"
    };
};

export default defineEventHandler(async (event) => {
  const method: string = event.method;

  if (method !== "DELETE" && method !== "GET" && method !== "POST" && method !== "PUT") {
    setResponseStatus(event, 418);

    return {
        "error": "That method is not allowed"
    };
  };

  if (method === "GET") {
    const feeds: FeedsTable[] = await getFeeds();

    setResponseStatus(event, 200);

    return {
        "feeds": feeds
    };
  };
  
  const body = await readBody(event);

  if (method === "POST") {
    const res = await createFeed(body["name"], body["url"]);

    setResponseStatus(event, res["status"]);
    
    if (res.status === 200) {
        return {
            message: res["message"]
        };
    };

    return {
        error: res["message"]
    };
  };

  if (method === "PUT") {
    const res = await editFeed(body["id"], body["name"]);

    setResponseStatus(event, res["status"]);

    if (res.status === 200) {
        return {
            message: res["message"]
        };
    };

    return {
        error: res["message"]
    };
  };

  if (method === "DELETE") {
    const res = await deleteFeed(body["id"]);

    setResponseStatus(event, res["status"]);

    if (res.status === 200) {
        return {
            message: res["message"]
        };
    };

    return {
        error: res["message"]
    };
  };
});