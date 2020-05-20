<script>
  import { arc } from "d3-shape";
  import * as d3 from "d3";
  export let segments;
  export let inner;
  export let outer;
  export let width;
  export let height

  const fn = arc();
  const colors = d3.quantize(
    d3.interpolateHcl("#A39ECB", "#6e3e8b"),
    segments.length
  );
  let angle = Math.PI * 2;

  $: polycalc = (options) => {
    const arc = fn(options)
    const outerOptions = {
      innerRadius: options.outerRadius * 1.1,
      outerRadius: options.outerRadius * 1.1,
      startAngle: options.startAngle,
      endAngle: options.endAngle
    }

    const A = fn.centroid(options)
    const B = fn.centroid(outerOptions)
    const C = fn.centroid(outerOptions)
    const T = fn.centroid(outerOptions)
    const midAngle = options.startAngle + (options.endAngle - options.startAngle) / 2
    C[0] = options.outerRadius * 1.1 * (midAngle < Math.PI ? 1 : -1)
    T[0] = options.outerRadius * 1.2 * (midAngle < Math.PI ? 1 : -1)
    const anchor = midAngle < Math.PI ? 'start': 'end'
    return {
      points: [A, B, C],
      T,
      anchor
    }
  }

  $: total = segments.reduce((total, s) => total + s.size, 0);

  let arcs;
  $: {
    let acc = 0;
    arcs = segments.map(segment => {
      const options = {
        innerRadius: inner,
        outerRadius: outer,
        startAngle: acc,
        endAngle: acc += (angle * segment.size) / total
      };
      const percentage = Math.round((segment.size / total) * 100);

      return {
        color: segment.color,
        label: segment.label,
        percentage: `${percentage}%`,
        d: fn(options),
        centroid: fn.centroid(options),
        polyline: polycalc(options)
      };
    });
  }

  const over = arc => {
    console.log(arc);
  };
</script>

<style>
  input {
    width: 100%;
  }

  g {
    width: 50%;
    height: calc(50% - 20em);
    /* opacity: 0.4; */
  }

  g:hover {
    opacity: 1;
  }

  path {
    stroke: white;
  }

  text {
    font-size: 6px;
    fill: white;
    font-weight: bold;
  }

  text.legend {
    font-size: 5.2px;
    font-weight: normal;
    fill: #222;
  }

  .outline {
    stroke: white;
    stroke-width: 0.4px;
    opacity: 0.6;
  }
</style>

<div style="position: relative">
  <svg viewBox="0 0 {width} {height}" width="100%">
    <g transform="translate({+width/2},{+height/2})">
      {#each arcs as arc, i}
        <!-- arc -->
        <path d={arc.d} fill={colors[i]} on:mouseover={() => over(arc)} />

        <!-- polylines -->
        <polyline stroke={colors[i]} stroke-width=0.5 points={arc.polyline.points} fill="none"></polyline>
        <text class="legend" transform='translate({arc.polyline.T})' text-anchor="{arc.polyline.anchor}">{arc.label}</text>

        <!-- label -->
        <text x={arc.centroid[0]-3} y={arc.centroid[1]}>{arc.percentage}</text>
      {/each}
    </g>
  </svg>
  <br>
  <center>
  <small>Campione di risposte {total}</small>
  </center>
</div>

<!-- <input bind:value={angle} type="range" min={0} max={Math.PI * 2} step={0.01} /> -->
