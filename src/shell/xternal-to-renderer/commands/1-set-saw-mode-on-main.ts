import { mainStore } from '@shell/store-main';
import { screen, BrowserWindow } from 'electron';

let savedPos: Electron.Rectangle = { x: 0, y: 0, width: 100, height: 300, }; // saved position and size before saw mode

export function setSawModeOnMain(winApp: BrowserWindow | null, on: boolean): void {
    if (!winApp) {
        return;
    }

    if (on) {
        savedPos = getWindowRect(winApp);

        const displays = screen.getAllDisplays();
        const externalDisplay = displays.find((display) => {
            return display.bounds.x !== 0 || display.bounds.y !== 0;
        });

        const nearestDisplay = screen.getDisplayNearestPoint(savedPos);
        const matchingDisplay = screen.getDisplayMatching(savedPos);

        console.log('\nsetSawMode on: \nsavedPos:', savedPos, '\ndisplays:', displays, '\nnearest:', nearestDisplay, '\nmatching:', matchingDisplay);

        winApp.setPosition(0, 0);
        winApp.setSize(300, 200);
        winApp.setAlwaysOnTop(true);

        mainStore.sawModeIsOn = true;
        return;
    } else {
        mainStore.sawModeIsOn = false;

        console.log('\nsetSawMode off prevPos:', savedPos);

        winApp.setAlwaysOnTop(false);

        setWindowRect(winApp, savedPos);
    }
}

function getWindowRect(win: BrowserWindow): Electron.Rectangle {
    const pos = win.getPosition();
    const size = win.getSize();
    return { x: pos[0], y: pos[1], width: size[0], height: size[1] };
}

function setWindowRect(win: BrowserWindow, rect: Electron.Rectangle) {
    win.setPosition(rect.x, rect.y);
    win.setSize(rect.width, rect.height);
}

/*
setSawMode on:
savedPos: { x: 2557, y: 34, width: 834, height: 939 }
displays: [
  {
    accelerometerSupport: 'unknown',
    bounds: { x: 0, y: 0, width: 2560, height: 1440 },
    colorDepth: 24,
    colorSpace: '{r:[0.6523, 0.3325], g:[0.2813, 0.6286], b:[0.1437, 0.0524], w:[0.3127, 0.3290]}, transfer:SRGB, matrix:RGB, range:FULL}',
    depthPerComponent: 8,
    detected: true,
    displayFrequency: 30,
    id: 1281159012,
    internal: false,
    label: 'BenQ PD3200U',
    maximumCursorSize: { width: 0, height: 0 },
    monochrome: false,
    nativeOrigin: { x: 0, y: 0 },
    rotation: 0,
    scaleFactor: 1.5,
    size: { width: 2560, height: 1440 },
    workArea: { x: 0, y: 0, width: 2560, height: 1400 },
    workAreaSize: { width: 2560, height: 1400 },
    touchSupport: 'unknown'
  },
  {
    accelerometerSupport: 'unknown',
    bounds: { x: 2560, y: 0, width: 2560, height: 1440 },
    colorDepth: 24,
    colorSpace: '{r:[0.6523, 0.3325], g:[0.2813, 0.6286], b:[0.1437, 0.0524], w:[0.3127, 0.3290]}, transfer:SRGB, matrix:RGB, range:FULL}',
    depthPerComponent: 8,
    detected: true,
    displayFrequency: 60,
    id: 1021335772,
    internal: false,
    label: 'BenQ PD3200U',
    maximumCursorSize: { width: 0, height: 0 },
    monochrome: false,
    nativeOrigin: { x: 2560, y: 0 },
    rotation: 0,
    scaleFactor: 1.5,
    size: { width: 2560, height: 1440 },
    workArea: { x: 2560, y: 0, width: 2560, height: 1400 },
    workAreaSize: { width: 2560, height: 1400 },
    touchSupport: 'unknown'
  }
]
nearest: {
  accelerometerSupport: 'unknown',
  bounds: { x: 0, y: 0, width: 2560, height: 1440 },
  colorDepth: 24,
  colorSpace: '{r:[0.6523, 0.3325], g:[0.2813, 0.6286], b:[0.1437, 0.0524], w:[0.3127, 0.3290]}, transfer:SRGB, matrix:RGB, range:FULL}',
  depthPerComponent: 8,
  detected: true,
  displayFrequency: 30,
  id: 1281159012,
  internal: false,
  label: 'BenQ PD3200U',
  maximumCursorSize: { width: 0, height: 0 },
  monochrome: false,
  nativeOrigin: { x: 0, y: 0 },
  rotation: 0,
  scaleFactor: 1.5,
  size: { width: 2560, height: 1440 },
  workArea: { x: 0, y: 0, width: 2560, height: 1400 },
  workAreaSize: { width: 2560, height: 1400 },
  touchSupport: 'unknown'
}
matching: {
  accelerometerSupport: 'unknown',
  bounds: { x: 2560, y: 0, width: 2560, height: 1440 },
  colorDepth: 24,
  colorSpace: '{r:[0.6523, 0.3325], g:[0.2813, 0.6286], b:[0.1437, 0.0524], w:[0.3127, 0.3290]}, transfer:SRGB, matrix:RGB, range:FULL}',
  depthPerComponent: 8,
  detected: true,
  displayFrequency: 60,
  id: 1021335772,
  internal: false,
  label: 'BenQ PD3200U',
  maximumCursorSize: { width: 0, height: 0 },
  monochrome: false,
  nativeOrigin: { x: 2560, y: 0 },
  rotation: 0,
  scaleFactor: 1.5,
  size: { width: 2560, height: 1440 },
  workArea: { x: 2560, y: 0, width: 2560, height: 1400 },
  workAreaSize: { width: 2560, height: 1400 },
  touchSupport: 'unknown'
}
*/