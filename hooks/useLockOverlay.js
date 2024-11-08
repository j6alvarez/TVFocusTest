import { useCallback, useEffect } from 'react';
import { useKey } from './useKey';
import { SupportedKeys } from '../components/remote-control/SupportedKeys';
import {useLockSpatialNavigation} from 'react-tv-space-navigation';


// This hook is used to lock the spatial navigation of parent navigator when a modal is open
// and to prevent the user from closing the modal by pressing the back button
export const useLockOverlay = ({ isModalVisible, hideModal }) => {
  useLockParentSpatialNavigator(isModalVisible);
  usePreventNavigationGoBack(isModalVisible, hideModal);
};

const useLockParentSpatialNavigator = (isModalVisible) => {
  const { lock, unlock } = useLockSpatialNavigation();
  useEffect(() => {
    if (isModalVisible) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [isModalVisible, lock, unlock]);
};

const usePreventNavigationGoBack = (isModalVisible, hideModal) => {
  const hideModalListener = useCallback(() => {
    if (isModalVisible) {
      hideModal();
      return true;
    }
    return false;
  }, [isModalVisible, hideModal]);
  useKey(SupportedKeys.Back, hideModalListener);
};
