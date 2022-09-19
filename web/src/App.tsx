import { useMemo, useState } from 'react';
import _ from 'lodash';
import styles from './App.module.css';
import { supportedAppStyles, supportedSpendContexts } from './constants';
import { Logo } from './assets';
import { Select, DollarInput } from './components';
import { ColorPicker, Copy } from './containers';

function App() {
  const [spendContext, setSpendContext] = useState('web');
  const [xAppStyle, setXAppTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#557FD0');
  const [maxAmountInUSD, setMaxAmountInUSD] = useState<string>();
  const memoizedSpendContext = useMemo(() => spendContext, [spendContext]);
  const memoizedXAppStyle = useMemo(() => xAppStyle, [xAppStyle]);
  const memoizedPrimaryColor = useMemo(() => primaryColor, [primaryColor]);
  const memoizedMaxAmountInUSD = useMemo(
    () => maxAmountInUSD,
    [maxAmountInUSD],
  );
  const chiSpendUrl = useMemo(
    () =>
      `https://chispend-staging.onrender.com/?cSContext=${memoizedSpendContext}${
        memoizedPrimaryColor
          ? `&primaryColor=${memoizedPrimaryColor.substring(1)}`
          : ''
      }${memoizedXAppStyle ? `&xAppStyle=${memoizedXAppStyle}` : ''}${
        memoizedMaxAmountInUSD
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
  return (
    <div className={styles.container}>
      <Logo />
      <h4>Easily embed the ChiSpend customisable market place </h4>
      <div className={styles.frame__section}>
        <div>
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
        <div className={styles.customization_widget__container}>
          <h4> Customisation widget</h4>
          <hr />
          <div className={styles.controls}>
            <p> Change Spend Context: </p>
            <Select
              onChange={handleChange}
              value={memoizedSpendContext}
              name="spendContext"
            >
              {supportedSpendContexts.map((context) => (
                <option value={context} key={context}>
                  {context}
                </option>
              ))}
            </Select>
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
            <DollarInput name="maxAmountInUSD" onChange={handleChange} />
            <p> ChiSpend Url </p>
            <Copy
              text={chiSpendUrl}
              onCopy={() => {
                alert('Copied customized ChiSpend to clipboard!');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
