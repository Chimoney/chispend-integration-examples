## ChiSpend Widget

A simple utility script for ChiSpend that handles embedding the `ChiSpendWidget` easily in your application. It also acts as a wrapper for the [`Pay With Wallet`](https://github.com/Chimoney/chispend-integration-examples/tree/main/web#-external-wallet-integration) functionality and exposes it in a simple `onData` callback.

## Installation

- Include `script` tag in head of html document.
 This adds the script to the browser's `window` and you are able to access the class as `ChiSpendWidget`

```html
<!-- add in site's  <head> -->
<script
  src="https://unpkg.com/@chimoney/chispend-widget/dist/main.js"
></script>
```


## Usage

```html
    <script>
        new ChiSpendWidget({
           // Dom string e.g (.myclass, button) or HTMLElement to insert ChiSpend
            insertionPoint: "#chispend-div", 
            // Chispend customizations. See: https://github.com/Chimoney/chispend-integration-examples/tree/main/web#customizing-chispend
            cutomizations: {
                cSContext: "web",
            },
           // Called when Pay With Wallet is clicked.
            onData: (data) => {
                alert(JSON.stringify(data, null , 2));
            },
            // Called when `ChiSpendWidget` loads.
            onLoad: () => {
                console.log("Loaded");
            },
        }); 
    </script>
```
