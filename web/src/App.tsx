import { useMemo, useState } from 'react';
import { ChromePicker } from 'react-color';
import _ from 'lodash';
import styles from './App.module.css';
import { supportedAppStyles, supportedSpendContexts } from './constants';

function App() {
  const [spendContext, setSpendContext] = useState("web");
  const [xAppStyle, setXAppTheme] = useState("moonlight");
  const [primaryColor, setPrimaryColor] = useState("#557FD0");
  const [maxAmountInUSD, setMaxAmountInUSD] = useState<string>();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const memoizedSpendContext = useMemo(() => spendContext, [spendContext]);
  const memoizedXAppStyle = useMemo(() => xAppStyle, [xAppStyle]);
  const memoizedPrimaryColor = useMemo(() => primaryColor, [primaryColor]);
  const memoizedMaxAmountInUSD = useMemo(() => maxAmountInUSD, [maxAmountInUSD]);
  const chiSpendUrl = useMemo(() => `https://chispend-staging.onrender.com/?cSContext=${memoizedSpendContext}${memoizedPrimaryColor ? `&primaryColor=${memoizedPrimaryColor.substring(1)}` : ""}${memoizedXAppStyle ? `&xAppStyle=${memoizedXAppStyle}` : ""}${memoizedMaxAmountInUSD ? `&maxAmountInUSD=${memoizedMaxAmountInUSD}` : ""}`, [memoizedMaxAmountInUSD, memoizedXAppStyle, memoizedPrimaryColor, memoizedSpendContext]); 


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    switch (event.target.name) {
      case "spendContext":
        setSpendContext(event.target.value);
        break;
      case "xAppTheme":
        setXAppTheme(event.target.value);
        break;
      case "maxAmountInUSD":
        setMaxAmountInUSD(event.target.value);
        break;
      default:
        break;
    }
  }
  return (
    <div className={styles.container}>
      <iframe src={chiSpendUrl} style={{ height: "100vh", width: "50%", outline: "none", border: "none" }} title="ChiSpend Widget" />
      <div>
        <p> Change Spend Context: </p>
        <select onChange={handleChange} value={memoizedSpendContext} name="spendContext">
          {supportedSpendContexts.map((context) => (
            <option value={context} key={context}>{context}</option>
          ))}
        </select>
        <p> Change App Theme: </p>
        <select onChange={handleChange} value={memoizedXAppStyle} name="xAppTheme">
          {supportedAppStyles.map((style) => (
            <option value={style} key={style}>{style}</option>
          ))}
        </select>
        <p> Change primary color: </p>
        <button onClick={() => {
          setColorPickerOpen(!colorPickerOpen);
        }}> {!colorPickerOpen ? "Open Color Picker" : "Close Color Picker"} </button>
        {
          colorPickerOpen && (<ChromePicker color={memoizedPrimaryColor} onChange={(color) => {
            const setColor = _.debounce(() => setPrimaryColor(color.hex), 50);
            setColor();
          }} />)
        }
         <p> Change max amount user can spend in USD: </p>
         <input type="number" name="maxAmountInUSD" onChange={handleChange} />
         <p> ChiSpend Url </p>
         <p><b>{chiSpendUrl}</b></p>
      </div>
    </div>
  );
}

export default App;
