import React, {useCallback, useEffect, useState} from 'react';
import Error from './Error';
import LoadingIndicator from './LoadingIndicator';

/**
 * @param {{onDataRecieved: (data: any) => JSX.Element, loadData: () => Promise<SuccessResponseType<*>|ErrorResponseType>}} props
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

  /**
   * @type {ComponentState<JSX.Element>}
   */
  const [showingElement, setShowingElement] = useState();

  const createShowingElement = () => {
    return showingElement;
  };

  const loadComponentData = useCallback(async () => {
    setIsLoading(true);
    const result = await loadData();

    if (result.success === true) {
      const resp = onDataRecieved(result.data);
      setShowingElement(resp);
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
      {showingElement !== undefined && createShowingElement()}
    </>
  );
};

export default GenericComponent;
