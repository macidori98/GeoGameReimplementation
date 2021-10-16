import React, {useCallback, useEffect, useState} from 'react';
import Error from './Error';
import LoadingIndicator from './LoadingIndicator';

/**
 * @param {{onDataRecieved: Function, loadData: () => Promise<SuccessResponseType<*>|ErrorResponseType>}} props
 * @returns
 */
const GenericComponent = props => {
  const {onDataRecieved, loadData} = props;

  /**
   * @type {ComponentState<string>}
   */
  const [error, setError] = useState(null);

  /**
   * @type {ComponentState<boolean>}
   */
  const [isLoading, setIsLoading] = useState(false);

  const loadComponentData = useCallback(async () => {
    setIsLoading(true);
    const result = await loadData();

    if (result.success === true) {
      onDataRecieved(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, [loadData, onDataRecieved]);

  useEffect(() => {
    loadComponentData();
  }, [loadComponentData]);

  return (
    <>
      {isLoading && !error && <LoadingIndicator />}
      {error && !isLoading && <Error message={error} />}
    </>
  );
};

export default GenericComponent;
