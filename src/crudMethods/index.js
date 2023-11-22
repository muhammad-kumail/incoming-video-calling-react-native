const {Icon} = require('react-native-elements');
const {scale} = require('../Theme');

export const labelIcon = (name, color) => {
  if (name.toLowerCase() === 'mobile')
    return (
      <Icon type="fontisto" name="mobile-alt" size={scale(20)} color={color} />
    );
  else if (name.toLowerCase() === 'work')
    return (
      <Icon
        type="material"
        name="work-outline"
        size={scale(20)}
        color={color}
      />
    );
  else if (name.toLowerCase() === 'home')
    return (
      <Icon type="font-awesome" name="home" size={scale(20)} color={color} />
    );
  else if (name.toLowerCase() === 'main')
    return (
      <Icon type="entypo" name="old-phone" size={scale(20)} color={color} />
    );
  else if (name.toLowerCase() === 'work fax')
    return <Icon type="material" name="fax" size={scale(20)} color={color} />;
  else if (name.toLowerCase() === 'home fax')
    return (
      <Icon type="font-awesome" name="fax" size={scale(20)} color={color} />
    );
  else if (name.toLowerCase() === 'pager')
    return (
      <Icon type="font-awesome" name="pager" size={scale(20)} color={color} />
    );
  else return <Icon type="zocial" name="call" size={scale(20)} color={color} />;
};
