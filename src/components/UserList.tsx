import React, { FC } from "react";
import { useState, useEffect } from "react";
import AddUser from "./AddUser";

interface IUser {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
          lat: string
          lng: string
        };
      };
      phone: string
      website: string
      company: {
        name: string
        catchPhrase: string
        bs: string
      };
}

const urlUsers = "https://jsonplaceholder.typicode.com/users"

const getUsers = async (): Promise<IUser[]> => {
    const response = await fetch(urlUsers);
    return response.json();
  };

  const UserList: FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      };
  
      fetchUsers();
    }, []);

    const onAdd = async (name: string, email:string) => {
        await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => {
            if (res.status !== 201) {
              return;
            } else {
              return res.json();
            }
          })
          .then((data) => {
            setUsers((users) => [...users, data]);
          })
          .catch((err) => {
            console.log(err);
          });
      };
  
    return (
      <div>
        <h2>User List</h2>
        <AddUser onAdd={onAdd} />
        <ul>
          {users.map((user) => (
            <div key={user.id}> 

            <li><span>{user.name}</span> <span>{user.email}</span>
            <span>
                <button>Edit</button>
                <button>Create</button>
            </span>
            </li>
            </div>
            
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserList;

// export const UserList: React.FC<IUser> = ({name}) => {
//     fetch(urlUsers)
//     .then((res) => res.json())
//     .then((data: IUser) => (data)) 
//     return (
// <div>
//     <li>
//         {name}
//     </li>
// </div>
//     );};


//     <div>
//     <h2>User List</h2>
//     <ul>
//       {urlUsers.map((us) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   </div>
// });}

// const initialUsers: IUser[] = fetch(urlUsers).then((res) => res.json()).then((data)=> [])

// const [users, setUsers] = useState(initialUsers)
// export default UserList;