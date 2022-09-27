import { useMediaQuery } from 'react-responsive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import styles from './App.module.css';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { useOnClickOutside } from 'usehooks-ts';
import { supportedAppStyles, supportedSpendContexts } from './constants';
import { CancelIcon, Logo, Pencil } from './assets';
import { Select, DollarInput } from './components';
import { ColorPicker, Copy } from './containers';
import { capitalizeFirst } from './util';


function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const [showMobileControls, setShowMobileControls] = useState(!isTabletOrMobile);
  const [spendContext, setSpendContext] = useState('web');
  const [xAppStyle, setXAppTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#670a78');
  const [maxAmountInUSD, setMaxAmountInUSD] = useState<string>("100");
  const memoizedSpendContext = useMemo(() => spendContext, [spendContext]);
  const memoizedXAppStyle = useMemo(() => xAppStyle, [xAppStyle]);
  const memoizedPrimaryColor = useMemo(() => primaryColor, [primaryColor]);
  const memoizedMaxAmountInUSD = useMemo(
    () => maxAmountInUSD,
    [maxAmountInUSD],
  );
  const chiSpendUrl = useMemo(
    () =>
      `https://chispend.com/?cSContext=${memoizedSpendContext}${memoizedPrimaryColor
        ? `&primaryColor=${memoizedPrimaryColor.substring(1)}`
        : ''
      }${memoizedXAppStyle ? `&xAppStyle=${memoizedXAppStyle}` : ''}${memoizedMaxAmountInUSD
        ? `&maxAmountInUSD=${memoizedMaxAmountInUSD}`
        : ''
      }`,
    [
      memoizedMaxAmountInUSD,
      memoizedXAppStyle,
      memoizedPrimaryColor,
      memoizedSpendContext,
    ],
  );
  const controlsRef = useRef(null);


  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    switch (event.target.name) {
      case 'spendContext':
        setSpendContext(event.target.value);
        break;
      case 'xAppTheme':
        setXAppTheme(event.target.value);
        break;
      case 'maxAmountInUSD':
        setMaxAmountInUSD(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleClickOnMobile = useCallback(() => {
    setShowMobileControls(!showMobileControls);
  }, [showMobileControls]);

  useEffect(() => {
    if (!controlsRef) return;
    const controls = controlsRef.current as unknown as HTMLDivElement;
    controls.style.cssText = `
    visibility: ${!showMobileControls && isTabletOrMobile ? 'hidden' : 'visible'};
    transform: ${!showMobileControls && isTabletOrMobile ? 'translateY(-100%)' : 'translateY(0%)'};
    `;
  }, [showMobileControls, isTabletOrMobile]);

  const handleClickOutside = () => {
    setShowMobileControls(false);
  }

  useOnClickOutside(controlsRef, handleClickOutside)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <h4>Easily embed the ChiSpend customisable market place </h4>
      </div>

      <div className={styles.frame__section}>
        <div className={styles.controls__mobile} onClick={handleClickOnMobile}>
          <Pencil />
        </div>
        <div className={styles.device__frame}>
          <DeviceFrameset device="iPhone 8" color="black">
            <iframe
              src={chiSpendUrl}
              style={{
                height: '100%',
                width: '100%',
                outline: 'none',
                border: 'none',
              }}
              title="ChiSpend Widget"
            />
          </DeviceFrameset>
        </div>
        <div className={styles.frame__mobile}>
          <iframe
            src={chiSpendUrl}
            style={{
              height: '100%',
              width: '100%',
              outline: 'none',
              border: 'none',
            }}
            title="ChiSpend Widget"
          />
        </div>
        <div className={styles.customization_widget__container} ref={controlsRef}>

          <div className={styles.header__mobile}>
            <CancelIcon onClick={() => {
              setShowMobileControls(false);
            }} />
            <Logo />
            <p>Easily embed the ChiSpend customisable market place </p>
          </div>


          <h4> Customisation widget</h4>
          <hr />
          <div className={styles.controls}>
            <p> Change App Theme: </p>
            <Select
              onChange={handleChange}
              value={memoizedXAppStyle}
              name="xAppTheme"
            >
              {supportedAppStyles.map((style) => (
                <option value={style} key={style}>
                  {style}
                </option>
              ))}
            </Select>
            <p> Change primary color: </p>
            <ColorPicker
              color={memoizedPrimaryColor}
              onChange={(color) => {
                const setColor = _.debounce(
                  () => setPrimaryColor(color.hex),
                  50,
                );
                setColor();
              }}
            />
            <p> Change max amount user can spend in USD: </p>
            <DollarInput name="maxAmountInUSD" value={memoizedMaxAmountInUSD} onChange={handleChange} />
            <p> Change Spend Context: </p>
            <Select
              onChange={handleChange}
              value={memoizedSpendContext}
              name="spendContext"
            >
              {supportedSpendContexts.map((context) => (
                <option value={context} key={context}>
                  {capitalizeFirst(context)}
                </option>
              ))}
            </Select>
            <p> ChiSpend Url </p>
            <Copy
              text={chiSpendUrl}
              onCopy={() => {
                alert('Copied customized ChiSpend to clipboard!');
              }}
            />
            <span><b>NOTES:</b></span>
            <ul>
              <li>Spend context is the preferred payment channel/method.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
