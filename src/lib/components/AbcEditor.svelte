<script>
  import { tuneAbc } from '$lib/util/stores';
</script>

<style>
  section {
    display: grid;
    grid-template-rows: 474px 60px;
    width: 100%;
  }
</style>

<section class="abc-editor">
  <textarea>{$tuneAbc}</textarea>
</section>
