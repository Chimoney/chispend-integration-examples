## ChiSpend Widget

A simple utility script for ChiSpenp that handles embedding the `ChiSpendWidget` easily in your application. It also acts as a wrapper for the [`Pay With Wallet`]() functionality and exposes it in a simple `onData` callback.

## Installation

- Include `script` tag in head of html document.
 This adds the script to the browser's `window` and you are able to access the class as `ChiSpendWidget`

```html
<!-- add in site's  <head> -->
<script
  src="https://unpkg.com/@chimoney/chispend-widget/dist/main.js"
  async
></script>
```


## Usage

```html
    <script>
        new ChiSpendWidget({
            insertionPoint: "#chispend-div",
            cutomizations: {
                cSContext: "web",
            },
            onData: (data) => {
                alert(JSON.stringify(data, null , 2));
            },
            onLoad: () => {
                console.log("Loaded");
            },
        }); 
    </script>
```
