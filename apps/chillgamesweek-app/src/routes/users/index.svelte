<script lang="ts">
import User from "$lib/components/User.svelte";
import type { UserEntity } from "$lib/types/UserEntity";

export let users: Array<UserEntity>;
</script>

<main>
  <h1>USERS</h1>
  <h2>Page to display a list of users</h2>
  <hr />

  {#if users.length}
    {#each users as user}
      <User user={user}/>
      <hr />
    {/each}
  {:else}
    <div>No users to display</div>
  {/if}
</main>

<style>
  main {
    font-size: 1.5rem;
    margin: 4rem;
    padding: 2rem;
    color: gray;
    justify-content: center;
    box-shadow: 4px 5px 11px 10px lightgray;
  }
</style>
