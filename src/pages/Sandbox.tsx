import { useState } from "react";

import AppButton from "../components/AppButton";

function Sandbox() {
  const [count, setCount] = useState(0);

  const handleIncreaseClick = () => {
    setCount(count + 1);
  };

  const handleDecreaseClick = () => {
    count > 0 && setCount(count - 1);
  };

  return (
    <>
      <h2 className="user-select-none">Counter: {count}</h2>
      <span className="d-flex gap-2">
        <AppButton variant="primary" onClick={handleIncreaseClick}>
          + Increase
        </AppButton>

        <AppButton
          variant="primary"
          onClick={handleDecreaseClick}
          disabled={count === 0}
        >
          - Decrease
        </AppButton>
      </span>
    </>
  );
}

export default Sandbox;
