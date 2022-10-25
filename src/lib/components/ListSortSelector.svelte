<script>
  export let selectedSort = 'alphabetical';
  export let sortOptions = [
    { text: 'Abc', value: 'alphabetical' },
    { text: 'Key', value: 'key' },
    { text: 'Sets', value: 'sets' }
  ];

  const handleClick = (event) => {

  }
</script>

<section class='list-sort-selector'>
  {#each sortOptions as sort}
    <span on:click={() => selectedSort = sort.value}>{sort.text}</span>)
  {/each}
</section>
