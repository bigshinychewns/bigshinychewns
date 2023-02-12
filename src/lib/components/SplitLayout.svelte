<section>
	<slot />
</section>

<style>
	section {
		min-height: 100%;
		padding-left: 1em;
		padding-right: 1em;
		padding-top: 1em;
		padding-bottom: 1em;
		display: grid;
		background-color: var(--dark);
		color: var(--light);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1em;
		overflow: hidden;
		border-bottom: 1em solid var(--darkest);
		border-right: 1em solid var(--darkest);
		border-left: 1em solid var(--darkest);
	}
  @media screen and (max-width: 700px) {
    section {
      grid-auto-rows: minmax(0, 1fr);
      grid-auto-flow: row;
      row-gap: 1em;
      grid-template-columns: unset;
      height: calc(100vh - 9em);
      min-width: 0;
    }
  }
</style>
