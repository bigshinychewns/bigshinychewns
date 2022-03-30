<script>
  export let handleClick = () => {};
  export let playing = false;
</script>

<style>
  section {
    display: grid;
  }
  button {
    display: grid;
    place-items: center;
  }
  .gg-play-button-o {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 20px;
    --ggs: 2;
    color: var(--darkest);
  }
  .gg-play-button-o::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 0;
    height: 10px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 6px solid;
    top: 4px;
    left: 7px
  }
  .gg-play-pause-o {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 22px;
    --ggs: 2;
  }
  .gg-play-pause-o::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    left: 6px;
    top: 6px;
    border-left: 2px solid;
    border-right: 2px solid
  }
</style>

<section class="play-pause-button">
  <button on:click={handleClick}>
    <i class:gg-play-button-o={!playing} class:gg-play-pause-o={playing} />
  </button>
</section>
