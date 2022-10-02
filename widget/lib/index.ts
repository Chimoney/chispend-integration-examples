
type ChiSpendAppCustomizations = {
  xAppStyle: string;
  cSContext: string;
  primaryColor: string;
  maxAmountInUSD: string;
}

type ChiSpendConfig = {
  cutomizations: ChiSpendAppCustomizations;
  onLoad?: () => void;
  onData: (transaction: any) => void;
  insertionPoint: string | HTMLElement;
}


export class ChiSpendWidget {
  private _config: ChiSpendConfig;
  constructor(config: ChiSpendConfig) {
    if (!config) throw Error("No config specified");
    this._config = config;
    this._setup();
  }

  private _createFrame() {
    const iframe = document.createElement("iframe");
    const source = new URL("https://chispend.com");
    const queryParams = Object.keys(this._config.cutomizations);
    queryParams.forEach((p) => {
      source.searchParams.set(p, this._config.cutomizations[p as keyof ChiSpendAppCustomizations]);
    });
    iframe.src = source.href;
    iframe.setAttribute("style", "height:100%;width:100%;outline: none;border: none;");
    iframe.setAttribute('allowfullscreen', 'true')
    iframe.setAttribute('frameborder', "0")
    iframe.setAttribute('title', 'ChiSpend')
    iframe.setAttribute(
      'sandbox',
      'allow-forms allow-modals allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups allow-storage-access-by-user-activation'
    )
    iframe.onload = () => {
      if (this._config.onLoad) {
        this._config.onLoad();
      }
    }
    window.addEventListener("message", (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;
      if (!e.data?.paymentLink) return;
      if (this._config.onData) {
        this._config.onData(e.data);
      }
    });
    return iframe;
  }

  private _setup() {
    const frame = this._createFrame();
    let node;
    if (!this._config.insertionPoint) throw Error("No insertion point");
    if (this._config.insertionPoint instanceof HTMLElement) {
      node = this._config.insertionPoint;
    } else {
      node = document.querySelector(this._config.insertionPoint);
    }
    node?.appendChild(frame);
  }
}