<style>
  section {
    display: grid;
  }
  button {
    display: grid;
    place-items: center;
  }
  .gg-arrows-expand-right {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 14px;
    height: 14px;
    margin: 2px;
    box-shadow:
      -6px 6px 0 -4px,
      6px -6px 0 -4px;
    --ggs: 2;
    color: var(--darkest);
  }
  .gg-arrows-expand-right::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 2px;
    height: 22px;
    top: -4px;
    left: 6px;
    transform: rotate(45deg);
    border-top: 9px solid;
    border-bottom: 9px solid
  }
</style>

<section class="expand-button">
  <i class="gg-arrows-expand-right" />
</section>
