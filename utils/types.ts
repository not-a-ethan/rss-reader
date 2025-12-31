export interface FeedsTable {
    id: number,
    name: string,
    url: string
};

export interface RssItem {
    title: string,
    link: string,
    pubDate: string,
    author: string,
    content: string,
    contentSnippet: string,
    id: string,
    isoDate: string
};