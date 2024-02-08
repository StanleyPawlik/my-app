import { useState, useEffect, FC } from "react";

interface IAlbum {
    userId: number
    id: number
    title: string
}

const urlAlbum = "https://jsonplaceholder.typicode.com/albums"

const getAlbums = async (): Promise<IAlbum[]> => {
    const response = await fetch(urlAlbum);
    return response.json();
  };

  const UserAlbums: FC = () => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
  
    useEffect(() => {
      const fetchAlbums = async () => {
        const fetchedAlbums = await getAlbums();
        setAlbums(fetchedAlbums);
      };
  
      fetchAlbums();
    }, []);
  
    return (
      <div>
        <h2>User Comms</h2>
        <ul>
          {albums.map((album
          ) => (
            <div key={album.id}> 
            
            <li>{album.id} <span>{album.title}</span></li>
            </div>
            
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserAlbums;