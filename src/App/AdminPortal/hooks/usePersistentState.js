import { useState, useEffect } from "react";

const PERSISTENT_STATE_PREFIX = "PERSISTENT_STATE_";

const usePersistentState = (key, { initialValue, isSession }) => {
  const fullKey = PERSISTENT_STATE_PREFIX + key;

  // select storage type
  const persistentStorage = isSession ? sessionStorage : localStorage;

  // select persistent value, if exists
  const persistentValue = JSON.parse(persistentStorage.getItem(fullKey) || "{}");

  // initialize state
  const [state, setState] = useState(persistentValue.data || initialValue);

  useEffect(() => {
    persistentStorage.setItem(fullKey, JSON.stringify({ data: state }));
  }, [fullKey, persistentStorage, state]);

  return [state, setState];
};

export default usePersistentState;

// TODO: delete the older value on changing the storage type (session or local)
// TODO: remove the unused keys