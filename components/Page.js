import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import {
  SpatialNavigationRoot,
  useLockSpatialNavigation,
} from "react-tv-space-navigation";
import { useMenuContext } from "./Menu/MenuContext";
import { Keyboard } from "react-native";
import { GoBackConfiguration } from "./GoBackConfiguration";

/**
 * Locks/unlocks the navigator when the native keyboard is shown/hidden.
 * Allows for the native focus to take over when the keyboard is open,
 * and to go back to our own system when the keyboard is closed.
 */
const SpatialNavigationKeyboardLocker = () => {
  const lockActions = useLockSpatialNavigation();
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      lockActions.lock();
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      lockActions.unlock();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [lockActions]);

  return null;
};

export const Page = ({ navigation, children }) => {
  const isFocused = useIsFocused();
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();

  const isActive = isFocused && !isMenuOpen;

  const onDirectionHandledWithoutMovement = useCallback(
    (movement) => {
      if (movement === "left") {
        toggleMenu(true);
        navigation.navigate("Menu");
      }
    },
    [toggleMenu, navigation]
  );

  console.log("Page", { isActive, isMenuOpen });

  return (
    <SpatialNavigationRoot
      isActive={isActive}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <GoBackConfiguration />
      <SpatialNavigationKeyboardLocker />
      {children}
    </SpatialNavigationRoot>
  );
};
