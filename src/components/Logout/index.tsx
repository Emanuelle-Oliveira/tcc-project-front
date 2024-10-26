import federatedLogout from '@/utils/federatedLogout';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from '@mui/material';
import theme from '@/styles/theme';

export default function Logout() {
  return (
    <IconButton
      style={{ height: '40px', marginLeft: '8px' }}
      onClick={() => {
        federatedLogout();
      }}
    >
      <LogoutIcon sx={{ color: theme.palette.primary.light }} />
    </IconButton>
  );
}