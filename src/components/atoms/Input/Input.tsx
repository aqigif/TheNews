import type { TextInputProps } from 'react-native';

import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';

import { useTheme } from '@/theme';

const Input = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    const { colors, borders, gutters } = useTheme();

    return (
      <TextInput
        placeholderTextColor={colors.gray200}
        ref={ref}
        style={[
          borders.w_1,
          gutters.paddingHorizontal_16,
          gutters.paddingVertical_12,
          borders.rounded_4,
          { color: colors.gray800 },
          style,
        ]}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
