# electron-react: PMAT 2024 lite

An Electron application with React and TypeScript

![](./src/renderer/src/assets/previews/2024-04-26_15-06-09.png)

![](./src/renderer/src/assets/previews/2024-04-26_15-08-18.png)

# commands

* ```tsc -p tsconfig.web.json -w --noEmit```

# refs
* https://electron-vite.org/guide/dev
* https://www.electronjs.org/docs/latest/tutorial/context-isolation

## packages installation

```
p add -D @radix-ui/react-accordion @radix-ui/react-icons @radix-ui/react-slot class-variance-authority @radix-ui/react-checkbox @radix-ui/react-radio-group react-re
sizable-panels @radix-ui/react-scroll-area @radix-ui/react-select sonner @radix-ui/react-switch @radix-ui/react-tooltip
```

## asar archive

[G: how to view node js asar](https://stackoverflow.com/questions/38523617/how-to-unpack-an-asar-file)
``` pnpx @electron/asar extract app.asar <destfolder> ```
