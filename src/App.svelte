<script>
  if ("serviceWorker" in navigator)
    navigator.serviceWorker.register("/serviceWorker.js")
            .then(() => console.log("Service worker registered!"))
            .catch(err => console.error("Failed to register service worker", err))

  import "./lib/Tailwind.svelte"
  import "./style.css"
  import router from "page"
  import Home from "./pages/Home.svelte";
  let current; let params; [
          ["**", Home]
  ].forEach(route => router(route[0], context => {params = context.params; current = route[1]}))
  router.start();

  import USER from "./components/AuthenticationButton.svelte";
</script>

<svelte:head>
  <!--    todo change the site title or you can use -->
  <title>PWA - Dev Lucem</title>
</svelte:head>

<main class="flex flex-col h-screen w-screen bg-fade relative">

  <nav class="flex justify-between bg-primary px-4 py-2 shadow-lg">
    <h1 class="font-bold text-xl">PWA</h1>
    <div>
      <USER/>
    </div>
  </nav>

  <svelte:component this={current} {params}/>

</main>
