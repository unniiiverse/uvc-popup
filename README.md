# React popup

Simple react popup written on typescript! Also compatible with Next.js

## Usage 
Default usage example
```tsx
import React, { useState, useEffect } from "react";
import { Layer, Popup, Trigger, createUVCID } from "uvc-popup";

// Required styling
import "uvc-popup/css"

const Page: React.FC = () => {
  const [id_1] = useState<string>(createUVCID());
  const [id_2] = useState<string>(createUVCID());

  return (
    <div className="bg-slate-400 w-full h-full min-h-screen">
      {/* You can add "uvc-popup--fancy" to get basic styling */}
      <Layer className="uvc-popup--fancy">
        {/* Popups must be inside Layer component */}
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
    </div>
  );
};
```

## API
```ts
interface IPopupSettings {
  /** Specify scroll behaivour when active
   * Default - Scroll won't be hidden when layer active & layer position will be fixed
   * Hide - Scroll will be hidden with saving missing gap (layer padding will compensate scroll width)
   *  
   * @default 'hide'
   */
  scrollBehaivour?: 'default' | 'hide'
}

interface ILayerProps extends IPopupSettings {
  /** Popups */
  children: React.ReactNode | React.ReactNode[]

  className?: string
}

interface IPopupProps {
  /** Popup inner */
  children: React.ReactNode | React.ReactNode[]

  className?: string

  /** Out ID setter */
  idSetter: (val: string) => void

  /** aria-labbeledby */
  labelledbyId?: string,

  /** State observer */
  stateSetter?: (val: boolean) => void
}

interface ITriggerProps {
  /** Button inner */
  children: React.ReactNode | React.ReactNode[]

  className?: string

  /** Popup id given by idSetter in Popup component */
  id: string,

  /** aria-label */
  label?: string
}
```

## Get it now
```
npm install uvc-popup
``` 

Licensed under MIT | unniiiverse 2024