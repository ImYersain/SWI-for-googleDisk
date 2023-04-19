import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {checkIsAuth, logout} from '../redux/features/auth/authSlice';
import {AppDispatch, RootState} from '../redux/store';

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const studentName = useSelector((state: RootState) => state.auth.user?.studentname);
  const studentEmail = useSelector((state: RootState) => state.auth.user?.username);
  const isUcitel = useSelector((state: RootState) => state.auth.user?.username.includes('ucitel'));
  const activeStyles = {
    color: 'black',
  };

  const logoutHandler = () => {
    dispatch(logout()); //все что диспатчится, обязательно должно вызыватся потому что это просто экшн крейтер при вызове он возвращает сам экшн
    window.localStorage.removeItem('token');
    navigate('/login');
    toast('You are logged out');
  };

  return (
    <div className="flex p-4 justify-between items-center bg-[#8f0e07]">
      <span className="flex justify-center items-center w-30 h-30 p-2 bg-[#757474] text-white text-[14px] rounded-sm">
        <Link to={'/'}>SWI projects</Link>
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={'/home'}
              className="text-[14px] text-white hover:text-black"
              style={({isActive}) => (isActive ? activeStyles : undefined)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/projects'}
              className="text-[14px] text-white hover:text-black"
              style={({isActive}) => (isActive ? activeStyles : undefined)}
            >
              My Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/new'}
              className="text-[14px] text-white hover:text-black "
              style={({isActive}) => (isActive ? activeStyles : undefined)}
            >
              Add project
            </NavLink>
          </li>
          {isUcitel && (
            <>
              <li>
                <NavLink
                  to={'/studentlist'}
                  className="text-[14px] text-white hover:text-black "
                  style={({isActive}) => (isActive ? activeStyles : undefined)}
                >
                  Add students list
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/students'}
                  className="text-[14px] text-white hover:text-black "
                  style={({isActive}) => (isActive ? activeStyles : undefined)}
                >
                  Students
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}

      <div className="flex-col justify-center items-center">
        <div className="bg-[#757474] text-xs text-white hover:text-black rounded-sm px-4 py-2 text-center">
          {isAuth ? <button onClick={logoutHandler}>Logout</button> : <Link to={'/login'}>Login</Link>}
        </div>
        {isAuth && (
          <div className="text-white text-[14px] mt-2">
            Hello,
            {isUcitel ? (
              <span className="text-green-500"> ucitel </span>
            ) : (
              <span className="text-green-500"> { studentName || studentEmail} </span>
            )}
            !
          </div>
        )}
      </div>
    </div>
  );
};
