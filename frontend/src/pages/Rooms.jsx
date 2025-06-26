import React from 'react';
import { useParams } from 'react-router-dom';
import RoomsProduct from '../components/Roomsproduct';
import RoomInfo from '../components/Roominfo';

const Rooms = () => {
  const { id } = useParams();

  return (
    <div className="min-h-[70vh] ">
      {id ? <RoomInfo id={id} /> : <RoomsProduct />}
    </div>
  );
};

export default Rooms;
