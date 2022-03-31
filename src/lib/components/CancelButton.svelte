<script>
  import fsm from '$lib/util/fsm';

  const handleClick = () => {
    fsm.back();
  }
</script>

<style>
  section {
    display: grid;
  }
  button {
    display: grid;
    place-items: center;
  }
  .gg-close-o {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 40px;
    --ggs: 2;
  }
  .gg-close-o::after,
  .gg-close-o::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 3px
  }
  .gg-close-o::after {
    transform: rotate(-45deg)
  }
</style>

<section class="cancel-button">
  <button on:click={handleClick}>
    <i class="gg-close-o" />
  </button>
</section>
