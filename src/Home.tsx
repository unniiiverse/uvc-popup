import React, { useState, useEffect } from "react";
import { Layer, Popup, Trigger, createUVCID } from "../index";


const Home: React.FC = () => {
  const [id_1] = useState<string>(createUVCID());
  const [id_2] = useState<string>(createUVCID());

  return (
    <div className="Home bg-slate-400 w-full h-full min-h-screen">
      <Layer className="uvc-popup--fancy">
        <Popup id={id_1}>
          <p>DIALOG 1</p>

          <Trigger id={id_1}>
            <p>TRIGGER 1</p>
          </Trigger>
        </Popup>

        <Popup id={id_2}>
          <p>DIALOG 2</p>

          <Trigger id={id_2}>
            <p>TRIGGER 2</p>
          </Trigger>
        </Popup>
      </Layer>

      <Trigger id={id_1}>
        <p>TRIGGER 1</p>
      </Trigger>

      <Trigger id={id_2}>
        <p>TRIGGER 2</p>
      </Trigger>

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default Home;