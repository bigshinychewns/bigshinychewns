<script>
  import { networkIsActive } from "$lib/util/tunesStore";
</script>

<svg
  class:networkIsActive={$networkIsActive}
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
    fill="currentColor"
  />
  <path
    d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
    fill="currentColor"
  />
</svg>


<style>
  svg {
    animation: spinner-two-alt 1s cubic-bezier(.6,0,.4,1) infinite;
    stroke: currentColor;
    stroke: var(--medium);
  }

  svg path{
    fill: var(--medium);
  }

  @keyframes spinner-two-alt {
    0% {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(359deg)
    }
  }
</style>
