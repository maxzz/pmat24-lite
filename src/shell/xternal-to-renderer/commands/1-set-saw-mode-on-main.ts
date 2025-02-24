import { mainStore } from '@shell/store-main';
import { screen, BrowserWindow } from 'electron';

let savedPos: Electron.Rectangle = { x: 0, y: 0, width: 100, height: 300, }; // saved position and size before saw mode

export function setSawModeOnMain(winApp: BrowserWindow | null, on: boolean): void {
    if (!winApp) {
        return;
    }

    if (on) {
        savedPos = getWindowRect(winApp);

        console.log('\nwindow rect:', savedPos, '\nbounds:', winApp.getBounds());

        let newPos: Electron.Rectangle = { x: 0, y: 0, width: 300, height: 200, };

        const displays = screen.getAllDisplays();
        const nearestDisplay = screen.getDisplayNearestPoint(savedPos);
        const matchingDisplay = screen.getDisplayMatching(savedPos);

        // console.log('\nsetSawMode on:', '\ndisplays:', displays);
        // console.log('\nsetSawMode on:', '\nnearest:', nearestDisplay);
        console.log('\nsetSawMode on:', '\nmatching:', matchingDisplay);

        const newDisplay = matchingDisplay || nearestDisplay;
        newPos.x = newDisplay.bounds.x + newDisplay.bounds.width / 2 - savedPos.width / 2;
        newPos.y = newDisplay.bounds.y + newDisplay.bounds.height / 2 - savedPos.height / 2;

        console.log(`newDisplay.bounds.x: ${newDisplay.bounds.x} halfWidth: ${savedPos.width / 2} winHalfWidth: ${newPos.width / 2}`);
       
        // const newPos2 = screen.screenToDipRect(winApp, newPos);
        const newPos2 = screen.dipToScreenRect(winApp, newPos);
        console.log('\nsetSawMode on: \nsavedPos:', savedPos, '\nnewPos:', newPos, '\nnewPos2:', newPos2);
        
        console.log('-------');
        const newPos3 = screen.screenToDipRect(winApp, newDisplay.bounds);
        const newPos4 = screen.dipToScreenRect(winApp, newDisplay.bounds);
        console.log('\nsetSawMode on: \nnewPos3:', newPos3, '\nnewPos4:', newPos4);

        setWindowRect(winApp, newPos);
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
    win.setPosition(Math.round(rect.x), Math.round(rect.y));
    win.setSize(Math.round(rect.width), Math.round(rect.height));
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