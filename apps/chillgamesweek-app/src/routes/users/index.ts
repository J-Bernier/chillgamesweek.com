import type { UserEntity } from "../../lib/types/UserEntity";

export async function GET() {
  let usersResponse: {
    [username: string]: UserEntity
  };

  const response = await fetch('http://localhost:9000/users.json?ns=chillgamesweek-11d8c-default-rtdb');
  if(response.ok){
    usersResponse = await response.json();
    return {
      body: {users: usersResponse && Object.keys(usersResponse).length ? Object.values(usersResponse) : []},
    };
  }
}
