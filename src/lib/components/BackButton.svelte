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
  .gg-chevron-left-r {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 4px;
    --ggs: 2;
    color: var(--light);
}
.gg-chevron-left-r::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    left: 7px;
    top: 6px
}
  .gg-chevron-left-o {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 100px;
    --ggs: 2;
    color: var(--light);
  }
  .gg-chevron-left-o::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    left: 7px;
    top: 6px
  }
  .gg-chevron-left {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    --ggs: 2;
    color: var(--light);

}
.gg-chevron-left::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    left: 6px;
    top: 4px
}
</style>

<section class="back-button">
  <button on:click={handleClick}>
    <i class="gg-chevron-left" />
  </button>
</section>
