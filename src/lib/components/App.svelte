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
    grid-template-columns: 60px 315px 270px 315px 60px;
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
      <!-- <h1>YonsYams</h1> -->
      <h1>{$fsm}</h1>
      <div class="right">
      </div>
    </nav>
  </header>
  <main class="app">
    <AppDisplayManager />
  </main>
</section>
