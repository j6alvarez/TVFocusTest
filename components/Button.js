import { forwardRef } from "react";
import { Animated, Typography, View } from "react-native";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";

const ButtonContent = forwardRef((props, ref) => {
  const { isFocused, label } = props;
  return (
    <Container isFocused={isFocused} ref={ref}>
      <ColoredTypography isFocused={isFocused}>{label}</ColoredTypography>
    </Container>
  );
});

ButtonContent.displayName = "ButtonContent";

export const Button = ({ label, onSelect }) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused, isRootActive }) => (
        <ButtonContent label={label} isFocused={isFocused && isRootActive} />
      )}
    </SpatialNavigationFocusableView>
  );
};

const Container = ({ isFocused }) => (
  <Animated.View
    styles={{
      alignSelf: "baseline",
      backgroundColor: isFocused ? "white" : "black",
      padding: 5,
      borderRadius: 12,
      cursor: "pointer",
    }}
  />
);

const ColoredTypography = ({ isFocused }) => (
  <Typography
    styles={{
      color: isFocused ? "black" : "white",
    }}
  />
);
