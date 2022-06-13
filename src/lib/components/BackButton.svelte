<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let url_path_segments = [];
  $: url_path_segments = $page.url.pathname.split('/');

  const handleClick = () => {
    if (url_path_segments.length > 0) {
      goto(url_path_segments.slice(0, -1).join('/'));
    }
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
