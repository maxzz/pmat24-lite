// src/index.ts
function overflowPlugin({ addUtilities }) {
  const overlays = {
    ".overflow-overlay": {
      // 'overflow': 'auto', // TODO: object can't have multiple properties with the same name
      "overflow": "overlay"
    },
    ".overflow-y-overlay": {
      // 'overflow-y': 'auto',
      "overflow-y": "overlay"
    },
    ".overflow-x-overlay": {
      // 'overflow-x': 'auto',
      "overflow-x": "overlay"
    },
    "@supports (overflow: overlay)": {
      ".overflow-overlay": {
        "overflow": "overlay"
      },
      ".overflow-y-overlay": {
        "overflow-y": "overlay"
      },
      ".overflow-x-overlay": {
        "overflow-x": "overlay"
      }
    }
  };
  addUtilities(overlays);
  const smallscroll = {
    /* Firefox scrollbars */
    ".smallscroll": {
      "--sb-width": "8px",
      "--sb-radius": "4px",
      "--sb-color": "#666b7a",
      scrollbarColor: "var(--sb-color) transparent",
      scrollbarWidth: "thin"
    },
    /* Chrome scrollbars */
    ".smallscroll::-webkit-scrollbar": {
      width: "var(--sb-width)",
      height: "var(--sb-width)",
      backgroundColor: "transparent"
    },
    ".smallscroll::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--sb-color)",
      borderRadius: "var(--sb-radius)"
    },
    ".smallscroll::-webkit-scrollbar-corner": {
      backgroundColor: "transparent"
    }
  };
  addUtilities(smallscroll);
  const resizer = {
    ".resizer": {
      "&::-webkit-resizer": {
        backgroundColor: "transparent",
        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsSAAALEgHS3X78AAAAIGNIUk0AAG11AABzoAAA9q8AAIWZAABumgAA57sAADF9AAAXvQF2CngAAABESURBVHjajM67DQAgDENBw6x0WZDtHi3KR4klF5ausAAVvf8u0TGjgwFlMEUeepR+DCj72CJAC9AkW8OM4QMAAP//AwD5ltVB1vqf0gAAAABJRU5ErkJggg==")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        backgroundSize: "95% 95%"
      }
    }
  };
  addUtilities(resizer);
}
var src_default = overflowPlugin;

export { src_default as default, overflowPlugin };
//# sourceMappingURL=tw-overflow.js.map
//# sourceMappingURL=tw-overflow.js.map