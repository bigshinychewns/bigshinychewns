<script>
  import AppDisplayManager from '$lib/components/AppDisplayManager.svelte';
  import BackButton from '$lib/components/BackButton.svelte';
  import fsm from '$lib/util/fsm';

  $: console.log($fsm);
  const hideBackButtonStates = [
    'start',
    'displaySearchResults'
  ];
</script>
<style>
  :global(:root) {
    --darkest: hsl(0, 0%, 15%);
    --dark: hsl(0, 0%, 35%);
    --medium: hsl(0, 0%, 50%);
    --light: hsl(0, 0%, 65%);
    --lightest: hsl(0, 0%, 85%);
    --shadow-size: 20px;
    --shadow-blur-size: -15px;
    --shadow-color: hsla(0, 0%, 15%, 0.7);
  }
  :global(body) {
    font-family: 'Copse';
  }

  section {
    height: 100vh;
    width: 100vw;
    background-color: var(--darkest);
    color: var(--light);
    display: grid;
    grid-template-rows: 60px 624px;
    overflow: hidden;
  }
  header {
    display: flex;
  }
  nav {
    padding-left: 30px;
    padding-right: 30px;
    display: grid;
    place-items: center;
    grid-template-columns: 60px 215px 470px 215px 60px;
    grid-template-rows: auto;
    grid-template-areas:
      "backbutton spacerleft title spacerright forwardbutton";
  }
  main {
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    display: flex;
  }
  h1 {
    grid-area: title;
    text-align: center;
    font-family: 'Sherwood';
    font-size: 2.5em;
    color: var(--darkest);
    -webkit-text-stroke: 0.75px var(--light);
    text-shadow: 0.03125em 0.03125em 0 var(--darkest),
      0.0625em 0.0625em 0 var(--dark),
      0.09375em 0.09375em 0 var(--medium),
      0.125em 0.125em 0 var(--light),
      0.15625em 0.15625em 0 var(--lightest);

  }
  .left {
    grid-area: backbutton;
  }
  .right {
    grid-area: forwardbutton;
  }
</style>
<svelte:head>
  <style>
    @font-face {
      font-family: 'Copse';
      font-style: normal;
      font-weight: 500;
      src: url('/fonts/Copse-Regular.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Sherwood';
      font-style: normal;
      font-weight: 500;
      src: url('/fonts/Sherwood.ttf') format('truetype');
    }
  </style>
</svelte:head>

<section>
  <header>
    <nav>
      <div class="left">
        {#if !hideBackButtonStates.includes($fsm)}
          <BackButton />
        {/if}
      </div>
      <h1>Big Shiny Chewns</h1>
      <!-- <h1>{$fsm}</h1> -->
      <div class="right">
      </div>
    </nav>
  </header>
  <main class="app">
    <AppDisplayManager />
  </main>
</section>
