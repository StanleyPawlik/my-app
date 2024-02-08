import { useState, useEffect, FC } from "react";

interface IComm {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

const urlComm = "https://jsonplaceholder.typicode.com/comments"

const getComms = async (): Promise<IComm[]> => {
    const response = await fetch(urlComm);
    return response.json();
  };

  const UserComments: FC = () => {
    const [comms, setComms] = useState<IComm[]>([]);
  
    useEffect(() => {
      const fetchComms = async () => {
        const fetchedComms = await getComms();
        setComms(fetchedComms);
      };
  
      fetchComms();
    }, []);
  
    return (
      <div>
        <h2>User Comms</h2>
        <ul>
          {comms.map((comm
          ) => (
            <div key={comm.id}> 
            
            <li>{comm.name} <span>{comm.body}</span></li>
            </div>
            
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserComments;