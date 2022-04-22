import {AppBar, Box, Drawer, Typography, Toolbar, useTheme, Menu, MenuItem} from "@mui/material"
import React, {useState} from "react";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import {getHomePageUrl, getMyDiaryPageUrl, getPublicDiaryPageUrl} from "../routes";
import {useAuth} from "../Providers/AuthProvider";

interface BannerOption {
  title: string,
  icon: any,
  target: string,
}

const bannerOptions: Array<BannerOption> = [
  {
    title: "Home",
    icon: <HomeIcon />,
    target: getHomePageUrl(),
  }, {
    title: "My Diary",
    icon: <StickyNote2Icon />,
    target: getMyDiaryPageUrl(),
  }, {
    title: "Public",
    icon: <CoPresentIcon />,
    target: getPublicDiaryPageUrl(),
  }
]

const HorizontalOptionBar = () => {

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      {
        bannerOptions.map((option: BannerOption) => {
          return (
            <Box
              key={option.title}
              onClick={() => navigate(option.target)}
              sx={{
                width: '100px',
                textAlign: 'center',
                fontWeight: '300',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all .1s',
                '&:hover': {
                  color: '#f3ddfa',
                  fontWeight: '500'
                }
              }}
            >
              {option.title}
            </Box>
          )
        })
      }
    </Box>
  )
}

const OptionCards: React.FC<{onChooseOption: () => void}> = ({onChooseOption}) => {

  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {
        bannerOptions.map((option: BannerOption, index) => {
          return (
            <Box
              key={option.title}
              onClick={() => {
                navigate(option.target)
                onChooseOption()
              }}
              sx={{
                boxShadow: "0px 0px 4px .5px rgba(0, 0, 0, .25)",
                flex: '40%',
                mr: index % 2 === 0 ? '10px' : '0',
                ml: index % 2 === 0 ? '0' : '10px',
                mb: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '150px',
              }}
            >
              <Box sx={{color: theme.palette.primary.main}}>
                {option.icon}
              </Box>
              <Typography color='primary'>
                {option.title}
              </Typography>
            </Box>
          )
        })
      }
      {
        bannerOptions.length % 2 !== 0 && <Box sx={{flex: '40%', mr: '10px'}} />
      }
    </Box>
  )
}

const Banner = () => {

  const navigate = useNavigate()
  const theme = useTheme()
  const {logout, getCurrentUser} = useAuth()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event: any) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position='fixed'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '&': {
              minHeight: '50px'
            },
          }}
        >
          <Box sx={{display: 'flex'}}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: {
                  xs: 'space-between',
                  sm: 'left'
                },
                padding: {
                  xs: '6px 10px',
                  sm: '6px 13px',
                  md: '6px 20px'
                },
              }}
            >
              <Box
                onClick={() => {setIsDrawerOpen(true)}}
                sx={{
                  color: 'white',
                  display: {
                    xs: 'block',
                    sm: 'none'
                  }
                }}
              >
                <DensityMediumIcon />
              </Box>
              <Typography
                onClick={() => navigate(getHomePageUrl())}
                variant='h4'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  userSelect: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(to right, #a2ffa1, #ebffa1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  fontSize: {
                    xs: '23px',
                    sm: '25px',
                    md: '27px',
                  },
                  pl: {
                    xs: '15px',
                    sm: '15px',
                    md: '30px'
                  },
                  pr: {
                    md: '30px'
                  }
                }}
              >
                Today Diary
              </Typography>
              <Box sx={{
                  color: 'transparent',
                  userSelect: 'none',
                  display: {
                    xs: 'block',
                    sm: 'none'
                }
                }}
              >
                <DensityMediumIcon />
              </Box>
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex'
                },
                alignItems: 'center'
              }}
            >
              <HorizontalOptionBar />
            </Box>
          </Box>
          <Box
            onMouseEnter={handleOpen}
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              borderRadius: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              cursor: 'default',
              position: 'relative'
            }}
          >
            {getCurrentUser()?.getUsername().charAt(0).toUpperCase()}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              <MenuItem
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar
        sx={{
          '&': {
            minHeight: '50px'
          },
        }}
      />
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        transitionDuration={750}
      >
        <Box sx={{width: '100vw'}}>
          <Box
            onClick={() => setIsDrawerOpen(false)}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              mt: '6px',
              mr: '6px'
            }}
          >
            <CloseIcon />
          </Box>
          <Box sx={{padding: '20px'}}>
            <OptionCards onChooseOption={() => setIsDrawerOpen(false)} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Banner