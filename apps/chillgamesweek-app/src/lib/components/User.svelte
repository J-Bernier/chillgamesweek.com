<script lang="ts">
import type { UserEntity } from "$lib/types/UserEntity";

  export let user: UserEntity = {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    teams: {}
  };
</script>

<div>
  <div>Name : {user.firstName} {user.lastName}</div>
  <div>Email : {user.email}</div>
  <div>Date of birth : {user.birthDate}</div>
  <div>Teams: </div>
  {#if user.teams}
    {#each Object.keys(user.teams) as team}
      <ul>
        <li>{team}</li>
      </ul>
    {/each}
  {/if}
</div>

