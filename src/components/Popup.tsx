import React, { useState, useEffect, useRef } from "react";
import * as uuid from 'uuid';

import '../styles/popup.scss';

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

/** Popup layer */
export const Layer: React.FC<ILayerProps> = ({ children, className, scrollBehaivour }) => {
  const ref = useRef<HTMLDivElement>(null)
  scrollBehaivour = scrollBehaivour || 'hide';

  useEffect(() => {
    const layer = ref.current;

    if (!layer) return

    layer.addEventListener('click', e => {
      const self = e.target as HTMLElement;

      // Hide by clicking on layer
      if (!self.closest('.uvc-popup')) {
        ref.current?.childNodes.forEach(node => {
          const child = node as HTMLDivElement;

          togglePopup(child.id, true);
        })
      }
    })

    if (scrollBehaivour === 'default') {
      layer.style.position = 'fixed'
    }
  }, [])

  return (
    <div className={`uvc-popup-layer ${className ? className : ''}`} data-uvc-popup-settings={JSON.stringify({ scrollBehaivour })} ref={ref} aria-hidden>
      {children}
    </div>
  );
};



/** Popup dialog */
export const Popup: React.FC<IPopupProps> = ({ children, className, idSetter, labelledbyId, stateSetter }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [id] = useState(`uvc-${uuid.v4()}`);

  useEffect(() => {
    idSetter(id);

    const observer = new MutationObserver(() => {
      const self = ref.current as HTMLDivElement;

      if (stateSetter) stateSetter(self.classList.contains('uvc-popup--active'))
    })

    observer.observe(ref.current!, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false
    })
  }, [])

  return (
    <div className={`uvc-popup ${className ? className : ''}`} id={id} role="dialog" aria-modal aria-hidden aria-labelledby={labelledbyId} ref={ref}>
      {children}
    </div>
  );
};



/** Popup trigger. Already button element, putting another button element may cause hydration error in Next.js  */
export const Trigger: React.FC<ITriggerProps> = ({ children, className, id, label }) => {
  label = label || 'Toggle popup'

  return (
    <button className={`uvc-popup-trigger ${className ? className : ''}`} data-uvc-popup-target={id} aria-haspopup="dialog" tabIndex={0} onClick={() => togglePopup(id)} aria-label={label}>
      {children}
    </button>
  );
};



//* Handlers
/** Toggle popup
 * @param id Popup ID
 * @param hide Specify toggle action
 */
export function togglePopup(id: string, hide?: boolean) {
  const popup = document.querySelector(`#${id}`) as HTMLDivElement | undefined;
  if (!popup) throw new Error(`[UVC-Popup]: Can not find popup with id #${id}`);

  const layer = popup.closest('.uvc-popup-layer') as HTMLDivElement | undefined;
  if (!layer) throw new Error(`[UVC-Popup]: Can not find layer for popup with id #${id}`);

  const settings = JSON.parse(layer.getAttribute('data-uvc-popup-settings')!) as IPopupSettings;
  const triggers = document.querySelectorAll(`[data-uvc-popup-target="${id}"]`);



  // Define action
  if (hide || popup.classList.contains('uvc-popup--active')) {
    // Hide
    popup.classList.remove('uvc-popup--active')
    popup.setAttribute('aria-hidden', 'true')

    triggers.forEach(trigger => {
      trigger.classList.remove('uvc-popup-trigger--active')
    })
  } else {
    // Show
    popup.classList.add('uvc-popup--active')
    popup.setAttribute('aria-hidden', 'false')

    triggers.forEach(trigger => {
      trigger.classList.add('uvc-popup-trigger--active')
    })
  }



  // Toggle layer
  let isLayerActive = false;

  layer.childNodes.forEach(node => {
    const child = node as HTMLDivElement;

    if (child.classList.contains('uvc-popup--active')) isLayerActive = true;
  })

  if (isLayerActive) {
    // Show
    layer.classList.add('uvc-popup-layer--active')
    layer.setAttribute('aria-hidden', 'true')

    if (settings.scrollBehaivour === 'hide') toggleScroll(true, layer)
  } else {
    // Hide
    layer.classList.remove('uvc-popup-layer--active')
    layer.setAttribute('aria-hidden', 'false')

    if (settings.scrollBehaivour === 'hide') toggleScroll(false, layer)
  }
}

/** Hide scrollbar with saving scroll width
 * @param extendElement HTML element to extend. Default - document.body
 */
export function toggleScroll(hide: boolean, extendElement?: HTMLElement) {
  extendElement = extendElement || document.body;

  const offset = window.innerWidth - document.documentElement.clientWidth;

  if (hide) {
    document.body.style.overflowY = 'hidden';
    extendElement.style.paddingRight = `${offset}px`;
  } else {
    document.body.style.overflowY = 'visible';
    extendElement.style.paddingRight = '0';
  }
}