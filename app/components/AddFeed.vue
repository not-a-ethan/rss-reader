<script setup>
    import { ref } from 'vue';
    import { useFetch } from '#app';

    const form = ref({ name: '', url: '' });

    const submitThing = async () => {
        const name = form.value.name;
        const url = form.value.url;

        // All the client side Data Validation
        if (!name || name.trim().length === 0) {
            alert("You need a valid name");
            
            return;
        };

        if (!url || url.trim().length === 0) {
            alert("You need a valid feed URL");
            
            return;
        };

        let urlTest;

        try {
            urlTest = new URL(url);
        } catch (e) {
            alert("That is not a valid URL");
            
            return;
        };

        if (!(urlTest.protocol === "http:" || urlTest.protocol === "https:")) {
            alert("That is not a valid URL");

            return;
        };

        const { data, error } = await useFetch("/api/feeds", {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "url": url
            })
        });

        if (error.value) {
            // handle error (toast, etc.)
            console.error(error.value)
            return
        }

        // Option 1: reload the feeds from the API
        // Option 2: emit an event to the parent to refresh
        // For example:
        emit('feedCreated', data.value)

        // Reset form
        form.value.name = ''
        form.value.url = ''
    };
</script>

<template>
    <form  @submit.prevent="submitThing">
        <label for="name">Feed name:</label>
        <input type="text" required name="name" id="name" v-model="form.name" />

        <label for="url">Feed URL:</label>
        <input type="text" required name="url" id="url" v-model="form.url" />

        <button type="submit">Create Feed</button>
    </form>
</template>