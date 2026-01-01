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

    const allItems: RssItem[] = Object.values(items).flat();

    const selectedFeed = reactive({
        id: 0
    });
    const selectedItem = reactive({
        id: -1
    });
</script>

<template>
    <div id="container">
        <div id="feeds">
            <div class="feed" @click="selectedFeed.id = 0">
                <h3>All feeds</h3>
            </div>

            <div v-for="(feed, i) in feeds" :key="feed.id ?? i" class="feed" @click="selectedFeed.id = feed.id">
                <h3>{{ feed["name"] }}</h3>
            </div>
        </div>

        <div id="items">
            <div v-if="selectedFeed.id === 0" v-for="(item, i) in allItems" :key="i" class="item" @click="selectedItem.id = i">
                <h3>{{ item["title"] }}</h3>

                <p>{{ item["contentSnippet"] }}</p>
            </div>

            <div v-else v-for="(item, j) in items[selectedFeed.id]" :key="j" class="item" @click="selectedItem.id = j">
                <h3>{{ item["title"] }}</h3>

                <p>{{ item["contentSnippet"] }}</p>
            </div>
        </div>

        <div id="content">
            <h1><a target="_blank" :href=allItems[selectedItem.id]?.link>{{ allItems[selectedItem.id]?.title }}</a></h1>
            
            <div v-html="allItems[selectedItem.id]?.content"></div>
        </div>
    </div>
</template>

<style>
    @import url("~/assets/styles/feeds.css")
</style>