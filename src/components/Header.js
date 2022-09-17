import { AppBar, Toolbar, Typography, Stack, IconButton } from "@mui/material";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, resetUser } from "../redux/features/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetUser());
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography flexGrow={1} variant="h5">
            G5Exam
          </Typography>
          <Stack direction="row" alignItems="center">
            {user ? (
              <>
                <Typography
                  mx={5}
                  color="inherit"
                  fontWeight="bold"
                  variant="h5"
                >
                  Welcome, {user.name}
                </Typography>
                {/* logout */}
                <IconButton color="inherit" disableRipple onClick={onLogout}>
                  <FaSignOutAlt />
                  <Typography px={1} fontSize="1.4rem">
                    Logout
                  </Typography>
                </IconButton>
              </>
            ) : (
              <>
                {/* login */}
                <IconButton
                  color="inherit"
                  disableRipple
                  onClick={() => navigate("/login")}
                >
                  <FaSignInAlt />
                  <Typography px={1} fontSize="1.4rem">
                    Login
                  </Typography>
                </IconButton>

                {/* register */}
                <IconButton
                  color="inherit"
                  disableRipple
                  onClick={() => navigate("/register")}
                >
                  <FaUser />
                  <Typography px={1} fontSize="1.4rem">
                    Register
                  </Typography>
                </IconButton>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
