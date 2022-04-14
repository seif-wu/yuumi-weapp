import develop from './configs/develop';
import trial from './configs/trial';
import release from './configs/release';

const { miniProgram: { envVersion } } = wx.getAccountInfoSync();
const configObject = {
  'develop': develop,
  "trial": trial,
  "release": release,
};

export default configObject[envVersion];
