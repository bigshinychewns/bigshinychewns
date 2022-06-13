<script>
  import BackButton from '$lib/components/BackButton.svelte';
  const showBackButton = () => true;
</script>

<svelte:head>
  <link href="/styles/css-reset.css" rel="stylesheet">
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

    @media screen and (max-width: 475px) {
      body {
        font-size: 11px;
      }
    }

    @media screen and (min-width: 475px) and (max-width: 550px) {
      body {
        font-size: 13px;
      }
    }

    @media screen and (min-width: 900px) {
      body {
        font-size: 20px;
      }
    }

    @media screen and (min-width: 550px) and (max-width: 900px) {
      body {
        font-size: 15px;
      }
    }
  </style>
</svelte:head>

<style>
  :global(html) {
    --darkest: hsl(0, 0%, 15%);
    --dark: hsl(0, 0%, 35%);
    --medium: hsl(0, 0%, 50%);
    --light: hsl(0, 0%, 65%);
    --lightest: hsl(0, 0%, 85%);
    --shadow-size: 1em;
    --shadow-blur-size: -0.75em;
    --shadow-color: hsla(0, 0%, 15%, 0.7);

    font-family: 'Copse';
  }

  :global(body) {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 4em 1fr;
  }

  header {
    display: flex;
    background-color: var(--darkest);
    height: 4em;
    max-width: 100vw;
  }

  nav {
    flex: 1;
    padding-left: 1em;
    padding-right: 1em;
    display: grid;
    place-items: center;
    grid-template-columns: 5fr 20fr 50fr 20fr 5fr;
    justify-items: stretch;
    grid-template-rows: auto;
    grid-template-areas:
      "backbutton spacerleft title spacerright forwardbutton";
  }

  h1 {
    white-space: nowrap;
    grid-area: title;
    text-align: center;
    font-family: 'Sherwood';
    font-size: 2em;
    color: var(--darkest);
    padding-bottom: 0.25em;
    -webkit-text-stroke: 0.02em var(--light);
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

<header>
  <nav>
    <div class="left">
      {#if showBackButton}
        <BackButton />
      {/if}
    </div>
    <h1>Big Shiny Chewns</h1>
    <div class="right">
    </div>
  </nav>
</header>
<slot />
