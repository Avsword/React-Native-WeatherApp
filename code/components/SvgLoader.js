import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SvgLoader = ({ color, size }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M12 0C9.79086 0 7.70116 0.702452 5.99687 1.99756C4.29259 3.29267 3.00823 5.10986 2.27706 7.23518C1.54589 9.3605 1.39599 11.7075 1.84035 13.9875C2.2847 16.2675 3.29612 18.3877 4.7718 20.0724C6.24748 21.7571 8.11195 22.9254 10.2044 23.4317C12.2968 23.9379 14.5277 23.7556 16.5125 22.9118C18.4973 22.0681 20.1418 20.6069 21.2147 18.7488C22.2877 16.8908 22.7405 14.7489 22.5185 12.6142C22.2965 10.4795 21.4109 8.43615 20.0186 6.82323C18.6262 5.21031 16.8042 4.10785 14.7643 3.65288C12.7243 3.19791 10.5559 3.41539 8.59217 4.27532C6.62847 5.13524 4.97894 6.59187 3.84615 8.52906C2.71335 10.4662 2.15043 12.7939 2.21908 15.1077C2.28773 17.4215 2.98505 19.6522 4.1978 21.4653C5.41055 23.2785 7.08692 24.5785 9 25.2372'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
      <ActivityIndicator size='small' color={color} />
    </View>
  );
};

export default SvgLoader;
