<script setup lang="ts">
import type { FeedsTable, RssItem } from '~~/utils/types';

    const { data }: any = await useFetch("/api/feeds", { lazy: true });
    const feeds: FeedsTable[] = data["value"]["feeds"];

    const items: { [key: string]: RssItem[] } = {};

    for (let i = 0; i < feeds.length; i++) {
        const thisUrl: string = encodeURIComponent(feeds[i]["url"]);
        const { data }: any = await useFetch(`/api/fetchItems?url=${thisUrl}`);
                        
        items[feeds[i]["id"]] = data.value.items;
    };
    
    console.log(items);
</script>

<template>
    <div id="container">
        <div id="feeds">
            <div class="feed">
                <h3>Feed #1</h3>
            </div>

            <div class="feed">
                <h3>Feed #2</h3>
            </div>
        </div>

        <div id="items">
            <div class="item">
                <h3>Some title</h3>

                <p>Incididunt culpa eu dolor anim sit proident Lorem aute quis. Est reprehenderit anim magna deserunt ipsum mollit adipisicing esse enim.</p>
            </div>

            <div class="item">
                <h3>Some title</h3>

                <p>Incididunt culpa eu dolor anim sit proident Lorem aute quis. Est reprehenderit anim magna deserunt ipsum mollit adipisicing esse enim.</p>
            </div>
        </div>

        <div id="content">
            <p>article content</p>
        </div>
    </div>
</template>

<style>
    @import url("~/assets/styles/feeds.css")
</style>