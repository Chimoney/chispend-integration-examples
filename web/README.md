# ChiSpend integration example (Web)

This demo demostrates how to easily integrate the `ChiSpend` Multiwallet shopping experience in your web application.

## 📸 Screenshots
![Screenshot of demo](/screenshots/demo.png)

<br></br>
## Installation

```
 https://chispend.com/?cSContext={{YOUR PREFERRED SPEND CONTEXT}}
```

## Keywords:

- __SpendContext__: This is the payment method the ChiSpend experience should use for checkout. It's that simple! 🚀🚀🚀

- __Embed__: The `ChiSpend` experience.

- __Chimoney Object__: An object to be sent to the api to carry out a payment. `NOTE:` Only necessary for `Pay With Wallet` integration.


<br></br>
## Integrating ChiSpend

Integrating ChiSpend doesn't require you having any special skill. Yes, It's as easy as dropping an `iframe` in your existing web application!
For more context:

```html
 <iframe
  src="https://chispend.com/?cSContext={{YOUR PREFERRED SPEND CONTEXT}}"
  title="ChiSpend Widget"
  >
```
___Pretty easy right??? See I told you😁.___

## Customizing ChiSpend:

Customizing `ChiSpend` is a walk in the park just as installing it is. Infact, you don't need to do anything other than modify the `url` a bit. Simple right? Let's get it:

```html
 <iframe
  src="https://chispend.com/?cSContext=evm&primaryColor=eb4034&xAppTheme=light"
  title="ChiSpend Widget"
  >
```

### Customization Options:

- __primaryColor__: Css hex code without the `#` to use as primaryColor for the shopping experience.

- __maxAmountInUSD__: Maximum amount in __USD__(Dollars) a user is allowed to spend in the `Embed`.
- __cSContext__: The `SpendContext`.
- __xAppStyle__: The app theme to use in the `ChiSpend` widget.

### OTHER INFO

- `xAppStyle`

We currently support any of these __four(4)__ app themes.

```js
[
 'light',
 'dark', 
 'moonlight',
 'royal'
]
```

- `csContext`

We support payments through these methods.

```js
 [
 'valora', 
 'evm', 
 'mobile',
 'web', 
 'chimoney_redeem',
 'status', 
 'metamask',
 'walletconnect',
 'celo'
]
```

Want to enable checkouts on ChiSpend with your [`own wallet`](#ext_wallet)?

<br></br>

### <a name="ext_wallet"></a> **External wallet Integration**

---
![Image](/screenshots/pay_with_wallet.png)

- [Get your Api Key](#get_api_key).
- [Build the experience](#integrate_ext_wallet).

<br></br>
### <a name="get_api_key"></a>  **Get your Api Key**

To integrate your wallet for payments(`Pay With Wallet`), you need an `ApiKey`. This will be needed to send the `Chimoney Object` to the api.
To get the `Apikey` you need to [book a demo](https://chimoney.io/book-a-demo).

<br></br>
### <a name="integrate_ext_wallet"></a>  **Build the experience**

`ChiSpend` provides the `Pay with Wallet` option for the `web` SpendContext, This allows you __intercept__ the checkout process and manage the payment flow, You can attach a listener to the event posted by the `ChiSpend` widget to get an object which should be sent to the api to finish the payment flow. Before that you can carry out your business specific logic. See the example below:

```js
 const handleMessage = (e) => {
      // Don't proceed if there's no payment link.
      if (!e.data?.paymentLink) return;
      
      // Carry out business specific logic (e.g transction charge) and send Chimoney object (i.e e.data) to  ChiConnect.
      alert(`Here is the chimoney object for your transaction:\n${JSON.stringify(e.data, null, 2)}`);
    }
  
 // Listen for ChiSpend Pay with Wallet event. 
 window.addEventListener("message", handleMessage, false);
```


<br></br>
### Sample Chimoney Object for external wallet integration

```json
{
    "currency": "USD",
    "totalDueinUSD": 50.5,
    "issueID": "abcdefghijkl_50_00000000000000",
    "amount": 50,
    "ottData": {},
    "paymentLink": "https://dash.chimoney.io/pay/?issueID=abcdefghijkl_50_00000000000000",
    "type": "giftcard"
}
```

__Phew that was a easy enough :)__

`Need more help?`
Shoot an email to us at  [support](mailto:support@chimoney.io). We're more than happy to help you out in building your ChiSpend experience.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Support

If you're having trouble with the Demo or your integration, please reach out to us at <support@chimoney.io> or come chat with us on Slack.

## ChiConnect API Reference

For external wallet integrations checkout the [ChiConnect API Docs](https://chimoney.readme.io). It should cover all your needs. _Still stuck ?😓 No problems reach [help](mailto:support@chimoney.io)._ 

## License

MIT
