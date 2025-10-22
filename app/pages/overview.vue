<script setup lang="ts">

import { ref, computed } from 'vue';

import type { LESSONS_RESPONSE } from '../type';

const data = ref<LESSONS_RESPONSE|null>(null);

const numtopics = ref(64);
const numlesson = ref(284);
const numexchanges = ref(1673)
const view = ref(1);
const fterm = ref('');

const lessonlayout = computed(() => {
    return `view-${view.value}`
})

async function fetchData() {
try {
    data.value = null;
    const response = await fetch('/lessons.json');
    const result = await response.json() as LESSONS_RESPONSE;
    data.value = result;
  } catch (e) {
    console.log('error', e);
  }
}

const filteredLessons = computed(() => {
    if (!data.value?.search.lessons?.result.results) {
        return []
    }
    if (!fterm.value) {
        return data.value?.search.lessons?.result.results
    }
    return data.value?.search.lessons?.result.results.filter(result => result.Name.toLowerCase().includes(fterm.value.toLowerCase()))
})

fetchData()
</script>

<template>
    <div id="lesson-grid">
        <header></header>
        <Sidebar></Sidebar>
        <main>
            <h1>Intermediate</h1>
            <p id="result-summary">
                <span>{{numtopics}} Topics</span>
                <span>{{numlesson}} Lesson Videos</span>
                <span>{{numexchanges}} Video Exchanges</span>
            </p>
            <div id="upper-filters">
                <input type="search" v-model="fterm" placeholder="search" aria-label="search"/>
                <select aria-label="sort">
                    <option>Sort</option>
                </select>
                <fieldset>
                    <legend>View</legend>
                    <input id="view-1" type="radio" name="view" v-model="view" :value="1"/>
                    <label for="view-1">
                        <font-awesome icon="grip-lines"/>
                    </label>
                    <input id="view-2" type="radio" name="view" v-model="view" :value="2"/>
                    <label for="view-2">
                        <font-awesome icon="grip-vertical"/>
                    </label>
                    <input id="view-3" type="radio" name="view" v-model="view" :value="3"/>
                    <label for="view-3">
                        <font-awesome icon="grip"/>
                    </label>
                </fieldset>
            </div>
            <div id="lessons-list" :class="lessonlayout">
                <p v-if="filteredLessons.length === 0">No lessons match that filter</p> 
                <template v-for="result in filteredLessons" :key="result.id">
                    <Lesson :lesson="result" />
                </template>
            </div>
        </main>
    </div>
</template>
<style scoped>
#lesson-grid {
    display: grid;

    height:100vh;
}

header {
    grid-area: header;
}
aside {
    grid-area: aside;
}
main {
    grid-area: main;
}


main {
    margin-inline:.5rem
}
aside {
    display: none;
}
aside ul+ul {
    border-top: 1px solid #314b65;
}
#view-3,
#view-3+label {
    display: none;
}
@media only screen and (min-width:640px) {
    #lesson-grid {
        grid-template-columns: 300px 1fr;
        grid-template-rows:50px 1fr;
        grid-template-areas:
        "aside header"
        "aside main ";
    }
    aside{
        display: grid;
    }
    main {
        margin-inline:3rem
    }
    
    #view-3,
    #view-3+label{
        display: block;
    }

}
#result-summary,
#result-summary span{
    display:flex;
    align-items: center;
    color:var(--secondary-copy)
}
#result-summary span+span::before {
    content:"\A";
    width:2px;
    aspect-ratio:1;
    border-radius:50%;
    background: var(--secondary-copy);
    display:inline-block;
    margin:0 10px;
}
#lessons-list {
    display: grid;
    gap:1rem;
    --_across:1;
    grid-template-columns: repeat(var(--_across), minmax(0, 1fr)); 
}
#lessons-list.view-2 {
    --_across:2
}
#lessons-list.view-3 {
    --_across:3
}

#upper-filters {
    display: flex;
    gap:.5rem;
    margin-bottom: 1.5rem;
}

fieldset{
    display: flex;
    border: none;
    align-items: center;
    padding:0;
    flex-grow: 1;
    justify-content: right;
}
fieldset legend  {
    float: left;
}
input[type="radio"] {
    	width:0;
	opacity:0;
	position:absolute;
}
input[type="radio"]+label{
    cursor: pointer;
    border:1px solid transparent;
    border-radius: 100vw;
    padding: .5rem;
    aspect-ratio: 1;
    display:inline-block
}
input[type="radio"]:checked+label{
    border-color: black;
}

input[type="search"],
select {
    border-radius: 100vw;
    height:35px;
}
select {
    flex-basis: max-content;
}
input[type="search"] {
    background-color: var(--inactive-color);
    border-color:transparent;
    padding-left:1rem
}
</style>