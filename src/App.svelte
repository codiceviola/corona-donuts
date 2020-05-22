<script>
  import * as d3 from "d3";
  import { csv } from "d3-fetch";
  import { onMount } from "svelte";
  import { data } from "./store";
  import {
    chemioterapy,
    firstVisit,
    controlVisit,
    surgery,
    lab,
    covid
  } from "./wrangler";
  import { arc } from "d3-shape";
  import Donut from "./Donut.svelte";

  const URL =
    "https://docs.google.com/spreadsheets/d/1miXftfscBe4qQ-BT-iFicnCZOy5Z15DSDYqMl5Ub51Y/export?usp=sharing&format=csv";

  onMount(async () => {
    $data = await csv(URL, d => {
      const cols = Object.keys(d);
      return {
        first_visit: d[cols[5]],
        chemioterapy: d[cols[6]],
        control_visit: d[cols[7]],
        surgery: d[cols[8]],
        lab: d[cols[9]],
        commuter: d[cols[12]],
        alternatives: d[cols[22]],
        advices: d[cols[21]],
        covid: d[cols[13]]
      };
    });
  });
</script>

<main>

  {#if $data.length === undefined}
    <p>Loading...</p>
  {:else}
    <p>Questionari {$data.length}</p>
    
  <Donut segments={chemioterapy($data)} inner="38" outer="60" width=420 height=250 />    
  <Donut segments={controlVisit($data)} inner="38" outer="60" width=400 height=250 />
  <Donut segments={surgery($data)} inner="38" outer="60" width=400 height=250 />
  <Donut segments={lab($data)} inner="38" outer="60" width=420 height=250 />
  <Donut segments={covid($data)} inner="38" outer="60" width=400 height=250 />
  <Donut segments={firstVisit($data)} inner="38" outer="60" width=400 height=250 />
  {/if}
</main>
